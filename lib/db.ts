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
};
