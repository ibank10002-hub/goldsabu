-- 황금돈사부 랜딩페이지 · 주문 테이블
-- Supabase 대시보드 > SQL Editor 에서 이 파일 전체를 붙여넣고 실행하세요.

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,          -- 토스페이먼츠 orderId
  payment_key text,                        -- 토스페이먼츠 paymentKey (승인 후 채워짐)
  tier_id text not null,                   -- free | pro | premium | vip
  tier_name text not null,
  amount integer not null,
  status text not null default 'pending',  -- pending | paid | failed | refunded
  customer_email text,
  customer_name text,
  birth_datetime text,                     -- 사주 리포트용 생년월일시 (추후 폼에서 수집)
  birth_gender text,
  report_sent_at timestamptz,              -- 리포트 발송 완료 시각
  raw_payment_response jsonb,              -- 토스 승인 응답 원본 (디버깅/조회용)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_order_id_idx on orders (order_id);
create index if not exists orders_status_idx on orders (status);

-- updated_at 자동 갱신
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at
  before update on orders
  for each row
  execute function set_updated_at();

-- RLS: 서버(서비스 키)만 읽고 쓸 수 있도록 잠금. 클라이언트에서는 직접 접근하지 않습니다.
alter table orders enable row level security;

-- 정책을 만들지 않으면 기본적으로 모든 접근이 차단됩니다 (service_role 키는 RLS 우회).
-- 이 프로젝트는 API 라우트(app/api/confirm-payment)가 service_role 키로만 orders에 씁니다.
