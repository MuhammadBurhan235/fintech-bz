// controllers/UserController.js
import { supabase } from "../config/supabaseClient.js";

export const fetchUsers = async (req, res) => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};

export const fetchUser = async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};
