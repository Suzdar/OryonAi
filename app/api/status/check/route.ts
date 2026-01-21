import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getVismaAccessToken } from '@/lib/visma-auth';

type ApiStatus = 'operational' | 'degraded' | 'outage';

interface EndpointHealthCheck {
  id: string;
  name: string;
  url: string;
  status: ApiStatus;
  responseTime?: number;
  error?: string;
}

interface ApiHealthCheck {
  id: string;
  name: string;
  status: ApiStatus;
  uptime: number;
  responseTime?: number;
  lastChecked: string;
  endpoints: EndpointHealthCheck[];
}

interface StatusResponse {
  overallStatus: ApiStatus;
  apis: ApiHealthCheck[];
  lastUpdated: string;
  cached?: boolean;
}

// In-flight guard and cached last result to prevent overlapping runs
let currentCheck: Promise<StatusResponse> | null = null;
let lastResult: StatusResponse | null = null;

/**
 * Visma API configurations
 * Uses real authenticated API calls to test functionality
 */
const VISMA_APIS = [
  {
    id: 'visma-erp',
    name: 'Visma.net ERP API',
    baseUrl: process.env.VISMA_ERP_BASE_URL || 'https://integration.visma.net',
    description: 'Enterprise resource planning system',
    endpoints: [
      { id: 'customers', name: 'Customers', path: '/v1/customer?pagesize=1' },
      { id: 'suppliers', name: 'Suppliers', path: '/v1/supplier?pagesize=1' },
      { id: 'invoices', name: 'Customer Invoices', path: '/v1/customerInvoice?pagesize=1' },
      { id: 'sales-orders', name: 'Sales Orders', path: '/v1/salesorder?pagesize=1' },
      { id: 'accounts', name: 'Accounts', path: '/v1/account?pagesize=1' },
      { id: 'attributes', name: 'Attributes', path: '/v1/attribute?pagesize=1' },
      { id: 'carriers', name: 'Carriers', path: '/v1/carrier?pagesize=1' },
      { id: 'cash-accounts', name: 'Cash Accounts', path: '/v1/cashaccount?pagesize=1' },
      { id: 'cash-sale', name: 'Cash Sale', path: '/v1/cashsale?pagesize=1' },
      // removed: cash-transaction
      { id: 'contact', name: 'Contact', path: '/v1/contact?pagesize=1' },
      { id: 'contract-template', name: 'Contract Template', path: '/v1/contracttemplate?pagesize=1' },
      { id: 'contract-usage', name: 'Contract Usage', path: '/v1/contractusage?pagesize=1' },
      { id: 'country', name: 'Country', path: '/v1/country?pagesize=1' },
      { id: 'credit-term', name: 'Credit Term', path: '/v1/creditterm?pagesize=1' },
      { id: 'currency', name: 'Currency', path: '/v1/currency?pagesize=1' },
      { id: 'currency-rate', name: 'Currency Rate', path: '/v2/currencyrate?pagesize=1' },
      { id: 'currency-rate-type', name: 'Currency Rate Type', path: '/v2/currencyratetype?pagesize=1' },
      { id: 'customer-contract', name: 'Customer Contract', path: '/v1/customercontract?pagesize=1' },
      { id: 'customer-credit-note', name: 'Customer Credit Note', path: '/v1/customercreditnote?pagesize=1' },
      { id: 'customer-credit-writeoff', name: 'Customer Credit Write Off', path: '/v1/customercreditwriteoff?pagesize=1' },
      { id: 'customer-debit-note', name: 'Customer Debit Note', path: '/v1/customerdebitnote?pagesize=1' },
      { id: 'customer-document', name: 'Customer Document', path: '/v1/customerdocument?pagesize=1' },
      { id: 'customer-overdue-charge', name: 'Customer Overdue Charge', path: '/v1/customeroverduecharge?pagesize=1' },
      { id: 'customer-payment', name: 'Customer Payment', path: '/v1/customerpayment?pagesize=1' },
      { id: 'customer-payment-method', name: 'Customer Payment Method', path: '/v1/customerpaymentmethod?pagesize=1' },
      { id: 'customer-sales-price', name: 'Customer Sales Price', path: '/v1/customersalesprice?pagesize=1' },
      { id: 'deferral-code', name: 'Deferral Code', path: '/v1/deferralcode?pagesize=1' },
      { id: 'department', name: 'Department', path: '/v1/department?pagesize=1' },
      { id: 'dimension', name: 'Dimension', path: '/v1/dimension?pagesize=1' },
      { id: 'discount-v2', name: 'Discount V2', path: '/v2/discount?pagesize=1' },
      { id: 'discount-code-v2', name: 'Discount Code V2', path: '/v2/discountcode?pagesize=1' },
      { id: 'earning-type', name: 'Earning Type', path: '/v1/earningtype?pagesize=1' },
      { id: 'employee', name: 'Employee', path: '/v1/employee?pagesize=1' },
      { id: 'expense-claim', name: 'Expense Claim', path: '/v1/expenseclaim?pagesize=1' },
      { id: 'expense-receipt', name: 'Expense Receipt', path: '/v1/expensereceipt?pagesize=1' },
      { id: 'financial-period', name: 'Financial Period', path: '/v1/financialperiod?pagesize=1' },
      { id: 'fixed-asset', name: 'Fixed Asset', path: '/v1/fixedasset?pagesize=1' },
      { id: 'fixed-asset-class', name: 'Fixed Asset Class', path: '/v1/fixedassetclass?pagesize=1' },
      { id: 'fixed-asset-property-tax-group', name: 'Fixed Asset Property Tax Group', path: '/v1/fixedassetpropertytaxgroup?pagesize=1' },
      // removed: fixed-asset-transaction
      { id: 'general-ledger-balance', name: 'General Ledger Balance', path: '/v2/generalledgerbalance?periodid=202601&pagesize=1' },
      // removed: general-ledger-transactions
      { id: 'inventory', name: 'Inventory', path: '/v1/inventory?pagesize=1' },
      { id: 'inventory-adjustment', name: 'Inventory Adjustment', path: '/v1/inventoryadjustment?pagesize=1' },
      { id: 'inventory-issue', name: 'Inventory Issue', path: '/v1/inventoryissue?pagesize=1' },
      { id: 'inventory-receipt', name: 'Inventory Receipt', path: '/v1/inventoryreceipt?pagesize=1' },
      { id: 'inventory-transfer', name: 'Inventory Transfer', path: '/v1/inventorytransfer?pagesize=1' },
      // removed: journal-transaction-v2
      { id: 'kit-assembly', name: 'Kit Assembly', path: '/v1/kitassembly?pagesize=1' },
      { id: 'kit-specifications', name: 'Kit Specifications', path: '/v1/kitspecifications?pagesize=1' },
      { id: 'landed-cost-code', name: 'Landed Cost Code', path: '/v1/landedcostcode?pagesize=1' },
      { id: 'ledger', name: 'Ledger', path: '/v1/ledger?pagesize=1' },
      { id: 'location', name: 'Location', path: '/v1/location?pagesize=1' },
      { id: 'lot-serial-class', name: 'Lot Serial Class', path: '/v1/lotserialclass?pagesize=1' },
      { id: 'number-sequence', name: 'Number Sequence', path: '/v1/numbersequence?pagesize=1' },
      { id: 'organization', name: 'Organization', path: '/v1/organization?pagesize=1' },
      { id: 'packaging-type', name: 'Packaging Type', path: '/v1/packagingtype?pagesize=1' },
      { id: 'payment-method', name: 'Payment Method', path: '/v1/paymentmethod?pagesize=1' },
      { id: 'project', name: 'Project', path: '/v1/project?pagesize=1' },
      { id: 'project-account-group', name: 'Project Account Group', path: '/v1/projectaccountgroup?pagesize=1' },
      { id: 'project-basic', name: 'Project Basic', path: '/v1/projectbasic?pagesize=1' },
      { id: 'project-budget', name: 'Project Budget', path: '/v1/projectbudget?pagesize=1' },
      // removed: project-task
      // removed: project-transaction
      { id: 'purchase-order', name: 'Purchase Order', path: '/v1/purchaseorder?pagesize=1' },
      { id: 'purchase-order-basic', name: 'Purchase Order Basic', path: '/v1/purchaseorderbasic?pagesize=1' },
      { id: 'purchase-receipt-v2', name: 'Purchase Receipt V2', path: '/v2/purchasereceipt?pagesize=1' },
      { id: 'purchase-receipt-basic', name: 'Purchase Receipt Basic', path: '/v1/purchasereceiptbasic?pagesize=1' },
      { id: 'sales-category', name: 'Sales Category', path: '/v1/salescategory?pagesize=1' },
      { id: 'sales-order-v2', name: 'Sales Order V2', path: '/v2/salesorder?pagesize=1' },
      { id: 'sales-order-basic-v2', name: 'Sales Order Basic V2', path: '/v1/salesorderbasic?pagesize=1' },
      { id: 'sales-order-type', name: 'Sales Order Type', path: '/v1/salesordertype?pagesize=1' },
      { id: 'sales-person-v2', name: 'Sales Person V2', path: '/v2/salesperson?pagesize=1' },
      { id: 'shipment', name: 'Shipment', path: '/v1/shipment?pagesize=1' },
      { id: 'stocktake-v2', name: 'Stocktake V2', path: '/v2/stocktake?pagesize=1' },
      { id: 'subaccount', name: 'Subaccount', path: '/v1/subaccount?pagesize=1' },
      { id: 'supplier-document', name: 'Supplier Document', path: '/v1/supplierdocument?pagesize=1' },
      { id: 'supplier-invoice', name: 'Supplier Invoice', path: '/v1/supplierinvoice?pagesize=1' },
      { id: 'supplier-location', name: 'Supplier Location', path: '/v1/supplierlocation?pagesize=1' },
    ],
  },
  {
    id: 'employee-api',
    name: 'Employee API',
    baseUrl: process.env.VISMA_EMPLOYEE_BASE_URL || 'https://api.employeecore.hrm.visma.net',
    description: 'Employee management system',
    endpoints: [
      { id: 'employees', name: 'Employees', path: '/v2/employees?pageSize=1' },
      { id: 'positions', name: 'Positions', path: '/v2/employees?onlyActive=true&pageSize=1' },
      { id: 'tax-units', name: 'Tax Units', path: '/v2/taxUnits' },
    ],
  },
  {
    id: 'payroll-api',
    name: 'Payroll API',
    baseUrl: process.env.VISMA_PAYROLL_BASE_URL || 'https://payrollapi.no.visma.net',
    description: 'Payroll processing system',
    endpoints: [
      { id: 'paycodes', name: 'Paycodes', path: '/v1/query/paycodes' },
      { id: 'employees', name: 'Employees', path: '/v1/query/employees' },
      { id: 'wageruns', name: 'Wage Runs', path: '/v1/query/wageruns' },
    ],
  },
  {
    id: 'calendar-api',
    name: 'Calendar API',
    baseUrl: process.env.VISMA_CALENDAR_BASE_URL || 'https://api.calendar.hrm.visma.net',
    description: 'Calendar and scheduling system',
    endpoints: [
      { id: 'categories', name: 'Categories', path: '/v1/categories' },
    ],
  },
  // TODO: Add later
  // business-nxt, datamart-api
];

/**
 * Check API health using authenticated calls
 * Makes real API requests to verify functionality
 */
async function checkApiHealth(
  api: typeof VISMA_APIS[0],
  timeout: number = 45000
): Promise<ApiHealthCheck> {
  const startTime = Date.now();
  const endpoints: EndpointHealthCheck[] = [];

  try {
    // Get valid access token
    const token = await getVismaAccessToken();

    // Test endpoints with limited concurrency (pool size 3)
    const poolSize = 3;
    let cursor = 0;

    const runEndpoint = async (endpoint: typeof api.endpoints[number]) => {
      const endpointStartTime = Date.now();
      let endpointStatus: ApiStatus = 'operational';
      let endpointError: string | undefined;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const url = `${api.baseUrl}${endpoint.path}`;
        const response = await fetch(url, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'OryonAI-StatusMonitor/1.0',
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US',
          },
        });

        clearTimeout(timeoutId);
        const endpointResponseTime = Date.now() - endpointStartTime;
        const errorText = response.ok ? undefined : await response.text().catch(() => undefined);

        // Log response for debugging
        console.log(`[${api.name}] ${endpoint.name}: ${response.status} (${endpointResponseTime}ms)`);
        if (!response.ok) {
          console.log(`  Error: ${errorText?.substring(0, 200)}`);
        }

        // Performance thresholds: degraded > 6000ms, outage > 45000ms
        if (response.ok && endpointResponseTime < 6000) {
          endpointStatus = 'operational';
        } else if (response.status >= 400 && response.status < 500) {
          endpointStatus = 'degraded';
          endpointError = `HTTP ${response.status}${errorText ? `: ${errorText}` : ''}`;
        } else if (endpointResponseTime >= 6000 && endpointResponseTime < 45000) {
          endpointStatus = 'degraded';
          endpointError = 'Slow response';
        } else if (response.status >= 500) {
          endpointStatus = 'outage';
          endpointError = `HTTP ${response.status}${errorText ? `: ${errorText}` : ''}`;
        } else if (endpointResponseTime >= 45000) {
          endpointStatus = 'outage';
          endpointError = 'Slow response';
        } else {
          endpointStatus = 'outage';
          endpointError = `HTTP ${response.status}${errorText ? `: ${errorText}` : ''}`;
        }

        endpoints.push({
          id: endpoint.id,
          name: endpoint.name,
          url: endpoint.path,
          status: endpointStatus,
          responseTime: endpointResponseTime,
          error: endpointError,
        });
      } catch (error) {
        const endpointResponseTime = Date.now() - endpointStartTime;
        endpoints.push({
          id: endpoint.id,
          name: endpoint.name,
          url: endpoint.path,
          status: 'outage',
          responseTime: endpointResponseTime,
          error: error instanceof Error ? error.message : 'Request failed',
        });
      }
    };

    const worker = async () => {
      while (cursor < api.endpoints.length) {
        const ep = api.endpoints[cursor++];
        await runEndpoint(ep);
      }
    };

    const workers = Array.from({ length: Math.min(poolSize, api.endpoints.length) }, () => worker());
    await Promise.all(workers);

    // Calculate overall API status based on endpoints
    const operationalCount = endpoints.filter(e => e.status === 'operational').length;
    const degradedCount = endpoints.filter(e => e.status === 'degraded').length;
    const outageCount = endpoints.filter(e => e.status === 'outage').length;
    
    let overallStatus: ApiStatus;
    if (outageCount > 0 || operationalCount === 0) {
      overallStatus = 'outage';
    } else if (degradedCount > 0) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'operational';
    }
    
    // Calculate average response time
    const avgResponseTime = endpoints.reduce((sum, e) => sum + (e.responseTime || 0), 0) / endpoints.length;
    
    // Get historical uptime from database
    const logs = await db.apiStatusLog.findMany({
      where: { apiId: api.id },
      orderBy: { checkedAt: 'desc' },
      take: 100, // Last 100 checks for uptime calculation
    });
    
    // Uptime excludes only outages (degraded performance doesn't count as downtime)
    const uptimeCount = logs.filter(log => log.status !== 'outage').length;
    const uptime = logs.length > 0 ? (uptimeCount / logs.length) * 100 : 100;
    
    // Store result in database
    await db.apiStatusLog.create({
      data: {
        apiId: api.id,
        apiName: api.name,
        status: overallStatus,
        responseTime: Math.round(avgResponseTime),
        checkedAt: new Date(),
      }
    });
    
    return {
      id: api.id,
      name: api.name,
      status: overallStatus,
      uptime: Math.round(uptime * 10) / 10,
      responseTime: Math.round(avgResponseTime),
      lastChecked: new Date().toISOString(),
      endpoints,
    };
    
  } catch (error) {
    console.error(`Error checking ${api.name}:`, error);
    
    return {
      id: api.id,
      name: api.name,
      status: 'outage',
      uptime: 0,
      lastChecked: new Date().toISOString(),
      endpoints: api.endpoints.map(e => ({
        id: e.id,
        name: e.name,
        url: e.path,
        status: 'outage' as ApiStatus,
        error: 'Failed to check',
      })),
    };
  }
}

/**
 * GET /api/status/check
 * Performs authenticated health checks on all Visma APIs
 * Returns current status and historical uptime data
 */
async function runStatusCheck(): Promise<StatusResponse> {
  console.log('[Status Check] Starting API health checks...');

  const healthChecks = await Promise.all(VISMA_APIS.map(api => checkApiHealth(api)));

  const hasOutage = healthChecks.some(api => api.status === 'outage');
  const hasDegraded = healthChecks.some(api => api.status === 'degraded');
  const overallStatus: ApiStatus = hasOutage ? 'outage' : hasDegraded ? 'degraded' : 'operational';

  const result: StatusResponse = {
    overallStatus,
    apis: healthChecks,
    lastUpdated: new Date().toISOString(),
  };

  console.log('[Status Check] Complete. Overall status:', overallStatus);
  return result;
}

export async function GET(request: Request) {
  try {
    // In-flight guard: reuse ongoing check instead of starting another
    if (currentCheck) {
      return NextResponse.json(await currentCheck);
    }

    currentCheck = runStatusCheck()
      .then((result) => {
        lastResult = result;
        return result;
      })
      .finally(() => {
        currentCheck = null;
      });

    const result = await currentCheck;
    return NextResponse.json(result);
  } catch (error) {
    console.error('[Status Check] Fatal error:', error);
    // Fallback to last known good result if available
    if (lastResult) {
      return NextResponse.json({ ...lastResult, cached: true });
    }

    return NextResponse.json(
      { error: 'Failed to check API health', details: String(error) },
      { status: 500 }
    );
  }
}

// Don't cache this endpoint
export const dynamic = 'force-dynamic';
export const revalidate = 0;
