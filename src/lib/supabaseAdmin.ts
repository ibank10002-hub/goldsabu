import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// service_role 키는 RLS를 우회하므로 서버 코드(API 라우트)에서만 사용하세요.
// 클라이언트 컴포넌트에서 이 모듈을 절대 import하지 마세요.
export function getSupabaseAdmin() {
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase 환경변수(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)가 설정되지 않았습니다."
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
