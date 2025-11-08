-- Fix financial data security issues

-- 1. Fix fees table - remove public read access, only allow authenticated users to read fees
DROP POLICY IF EXISTS "Allow read access to all users" ON public.fees;
CREATE POLICY "Authenticated users can read fees" ON public.fees 
FOR SELECT 
TO authenticated
USING (true);

-- 2. Fix referrals table - restrict access to own referrals only
DROP POLICY IF EXISTS "Allow authenticated to select referrals" ON public.referrals;
DROP POLICY IF EXISTS "Allow authenticated to update referrals" ON public.referrals;

-- Users can only view referrals where they are the referrer or referred
CREATE POLICY "Users can view own referrals" ON public.referrals 
FOR SELECT 
TO authenticated
USING (referrer_id = auth.uid() OR referred_id = auth.uid());

-- Users can only update referrals where they are the referrer
CREATE POLICY "Users can update own referrals as referrer" ON public.referrals 
FOR UPDATE 
TO authenticated
USING (referrer_id = auth.uid())
WITH CHECK (referrer_id = auth.uid());

-- Service role can manage all referrals for system operations
CREATE POLICY "Service role can manage all referrals" ON public.referrals 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 3. Secure account_deletion_logs table
ALTER TABLE public.account_deletion_logs ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access deletion logs (sensitive admin data)
CREATE POLICY "Service role can manage account deletion logs" ON public.account_deletion_logs 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 4. Secure float_balances and float_balance_history tables
ALTER TABLE public.float_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.float_balance_history ENABLE ROW LEVEL SECURITY;

-- Only service role can access float balance data (business financial data)
CREATE POLICY "Service role can manage float balances" ON public.float_balances 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage float balance history" ON public.float_balance_history 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 5. Secure notification tables - users should only see their own notifications
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notification logs" ON public.notification_logs 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Service role can manage notification logs" ON public.notification_logs 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Users can view own notification queue" ON public.notification_queue 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Service role can manage notification queue" ON public.notification_queue 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 6. Secure balance_transfer_requests table
ALTER TABLE public.balance_transfer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own balance transfer requests" ON public.balance_transfer_requests 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can create own balance transfer requests" ON public.balance_transfer_requests 
FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Service role can manage balance transfer requests" ON public.balance_transfer_requests 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);