FROM node:18-alpine AS base

# 1.의존성 설치
FROM base AS deps
# libc6-compat 설치
RUN apk add --no-cache libc6-compat
# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 사용하는 패키지 매니저에 따라 의존성 설치
COPY package.json  package-lock.json*  ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 2. 빌드 스테이지
FROM base AS builder
# 작업 디렉토리를 /app으로 설정
WORKDIR /app
# node_modules 디렉토리 복사
COPY --from=deps /app/node_modules ./node_modules
# 소스코드 복사
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# 소스코드 빌드
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 3. 프로덕션 이미지 실행 스테이지
FROM base AS runner
# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# NODE_ENV 환경 변수 설정
ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

# 그룹 및 유저 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 빌드된 자원 복사
COPY --from=builder /app/public ./public

# .next 디렉토리 권한 설정
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 빌드 결과물 복사 및 파일 소유자 설정
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 사용자 설정
USER nextjs

# 3000번 포트 외부 노출
EXPOSE 3000

# 포트 환경 변수 설정
ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output

CMD ["node", "server.js"]
