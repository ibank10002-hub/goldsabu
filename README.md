# 황금돈사부 · 인생사주리포트 랜딩페이지

아임웹을 대체하는 자체 랜딩/결제 페이지. Next.js + 토스페이먼츠 결제위젯 + Supabase.

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` (또는 지정한 포트)에서 확인.

## 환경변수

`.env.local.example`을 복사해 `.env.local`로 만들고 값을 채우세요.

| 변수 | 용도 |
| --- | --- |
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` | 토스페이먼츠 결제위젯 클라이언트 키 |
| `TOSS_SECRET_KEY` | 토스페이먼츠 결제 승인용 시크릿 키 (서버 전용) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role 키 (서버 전용, 절대 노출 금지) |

기본값은 토스페이먼츠 공식 문서용 테스트 키로 채워져 있어 실제 결제 없이 개발/테스트가 가능합니다.
실 결제를 받으려면 사업자 등록 후 토스페이먼츠 전자결제 신청을 완료하고 발급받은 실 키로 교체하세요.

## 데이터베이스

`supabase/schema.sql`을 Supabase 대시보드의 SQL Editor에서 실행하면 `orders` 테이블이 생성됩니다.
주문 흐름: 결제 버튼 클릭 → `/api/create-order`로 `pending` 주문 생성 → 결제 완료 후
`/api/confirm-payment`가 토스 승인 API를 호출하고 성공 시 주문을 `paid`로 갱신합니다.

## 배포

Vercel에 GitHub 저장소를 연결하면 자동 배포됩니다. Vercel 프로젝트 설정의
Environment Variables에 위 표의 값을 동일하게 등록하세요.
