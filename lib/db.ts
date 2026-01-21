import { supabase } from "./supabase";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  subscription: {
    id: string;
    tier: "FREE" | "LITE" | "PRO" | "ADVANCED";
    status: "active" | "inactive";
    createdAt: Date;
  };
  createdAt: Date;
}

function mapUser(row: any): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    subscription: {
      id: row.id,
      tier: row.tier,
      status: row.status,
      createdAt: new Date(row.subscription_created_at ?? row.created_at),
    },
    createdAt: new Date(row.created_at ?? row.subscription_created_at),
  };
}

export const db = {
  user: {
    findUnique: async (options: { where: { email: string } }) => {
      const { data, error } = await supabase
        .from("users")
        .select(
          "id, name, email, password, tier, status, subscription_created_at, created_at"
        )
        .eq("email", options.where.email)
        .maybeSingle();

      if (error) {
        throw new Error(`Supabase findUnique error: ${error.message}`);
      }

      if (!data) return null;

      return mapUser(data);
    },
    create: async (options: { data: { name: string; email: string; password: string } }) => {
      const payload = {
        name: options.data.name,
        email: options.data.email,
        password: options.data.password,
        tier: "FREE",
        status: "active",
      };

      const { data, error } = await supabase
        .from("users")
        .insert(payload)
        .select(
          "id, name, email, password, tier, status, subscription_created_at, created_at"
        )
        .single();

      if (error) {
        throw new Error(`Supabase create error: ${error.message}`);
      }

      return mapUser(data);
    },
  },
  apiStatusLog: {
    findMany: async (options?: {
      where?: { apiId?: string };
      orderBy?: { checkedAt: 'desc' | 'asc' };
      take?: number;
    }) => {
      let query = supabase
        .from("api_status_logs")
        .select("*");

      if (options?.where?.apiId) {
        query = query.eq("api_id", options.where.apiId);
      }

      if (options?.orderBy?.checkedAt) {
        query = query.order("checked_at", { ascending: options.orderBy.checkedAt === 'asc' });
      }

      if (options?.take) {
        query = query.limit(options.take);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Supabase findMany error: ${error.message}`);
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        apiId: row.api_id,
        apiName: row.api_name,
        status: row.status,
        responseTime: row.response_time,
        checkedAt: new Date(row.checked_at),
      }));
    },
    create: async (options: {
      data: {
        apiId: string;
        apiName: string;
        status: string;
        responseTime: number;
        checkedAt: Date;
      };
    }) => {
      const payload = {
        api_id: options.data.apiId,
        api_name: options.data.apiName,
        status: options.data.status,
        response_time: options.data.responseTime,
        checked_at: options.data.checkedAt.toISOString(),
      };

      const { data, error } = await supabase
        .from("api_status_logs")
        .insert(payload)
        .select()
        .single();

      if (error) {
        throw new Error(`Supabase create error: ${error.message}`);
      }

      return {
        id: data.id,
        apiId: data.api_id,
        apiName: data.api_name,
        status: data.status,
        responseTime: data.response_time,
        checkedAt: new Date(data.checked_at),
      };
    },
  },
};
