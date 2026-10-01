-- 20240903_add_user_id_and_policy_detail_transaksi.sql
-- Add user_id column to detail_transaksi (if not already present)
ALTER TABLE detail_transaksi
  ADD COLUMN IF NOT EXISTS user_id uuid;

-- Add foreign‑key relationship to Supabase auth.users (optional but recommended)
-- The foreign key constraint fk_detail_transaksi_user already exists; no action needed.

-- RLS policy: allow a user to INSERT rows that reference their own user_id
-- For INSERT you must use WITH CHECK, not USING.
CREATE POLICY "allow_insert_own_detail" ON detail_transaksi
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Optional: you may also want a policy for SELECT/UPDATE/DELETE
CREATE POLICY "allow_select_own_detail" ON detail_transaksi
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "allow_update_own_detail" ON detail_transaksi
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "allow_delete_own_detail" ON detail_transaksi
FOR DELETE
USING (auth.uid() = user_id);

-- Enable row‑level security if not already enabled
ALTER TABLE detail_transaksi ENABLE ROW LEVEL SECURITY;
