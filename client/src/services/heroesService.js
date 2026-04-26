import { apiGet } from "./api";
import { supabase } from "../utils/supabase";

export async function getHeroes() {
  return apiGet("/heroes");
}

export async function getAllRandomHero() {
  return apiGet("/heroes/random/all");
}

export async function getFilteredRandomHero(role, universe) {
  let query = supabase.from("heroes").select("*");

  if (role) {
    query = query.eq("role", role);
  }

  if (universe) {
    query = query.eq("universe", universe);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("No heroes found");
  }

  return data[Math.floor(Math.random() * data.length)];
}

export async function getRandomFromPool(selectedIds) {
  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .in("id", selectedIds);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("No heroes found");
  }

  return data[Math.floor(Math.random() * data.length)];
}
