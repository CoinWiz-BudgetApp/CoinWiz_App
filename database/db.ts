import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types
export type Category = {
  id: string;
  name: string;
  budget: number;
};

export type Transaction = {
  id: string;
  amount: number;
  category_id: string;
  created_at: string;
};

// Category functions
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    console.error("getCategories error:", error);
    return [];
  }

  return data;
};

export const addCategory = async (
  name: string,
  budget: number = 0
): Promise<Category | null> => {
  const { data, error } = await supabase
    .from("categories")
    .insert([{ name, budget }])
    .select();

  if (error) {
    console.error("addCategory error:", error);
    return null;
  }

  return data[0];
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) console.error("deleteCategory error:", error);
};

// Transaction functions
export const getTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getTransactions error:", error);
    return [];
  }

  return data;
};

export const addTransaction = async (
  amount: number,
  category_id: string
): Promise<Transaction | null> => {
  const { data, error } = await supabase
    .from("transactions")
    .insert([{ amount, category_id }])
    .select();

  if (error) {
    console.error("addTransaction error:", error);
    return null;
  }

  return data[0];
};

export const deleteTransaction = async (id: string) => {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) console.error("deleteTransaction error:", error);
};