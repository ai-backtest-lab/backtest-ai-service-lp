.PHONY: setup build dev preview stop status check browser-check capture-assets media-stack-up media-stack-down media-capture release-check cloudflare-audit
setup: ## Install the locked project dependencies
	pnpm install --frozen-lockfile
build: ## Build the production-ready static site into out/
	pnpm build
dev: ## Start the owned Next.js dev server on loopback 3220
	python3 scripts/site.py dev
preview: ## Serve the already-built static artifact on loopback 3221
	python3 scripts/site.py preview
stop: ## Stop only this repository's owned dev/preview processes
	python3 scripts/site.py stop
status: ## Inspect owned dev and preview state
	python3 scripts/site.py status
check: ## Run tests, TypeScript and lint without starting a service
	pnpm test
	pnpm type-check
	pnpm lint

browser-check: preview ## Inspect static UI in headed Chrome with actual DevTools
	node scripts/browser-check.mjs

capture-assets: preview ## Refresh hero and brand screenshots from the current static build
	node scripts/capture-assets.mjs
	node scripts/assets.mjs

media-stack-up: ## Start the synthetic market (8031) and an isolated Research API (8021, research__media)
	scripts/media/stack.sh up

media-stack-down: ## Stop the media stack and compare research ledger run counts
	scripts/media/stack.sh down

media-capture: ## Re-capture product screenshots and video from a clean media database (needs Research UI on 3210)
	scripts/media/stack.sh down
	scripts/media/stack.sh reset
	scripts/media/stack.sh up
	node scripts/media/capture.mjs
	node scripts/media/encode.mjs
	scripts/media/stack.sh down
	scripts/media/stack.sh reset
	scripts/media/stack.sh up
	node scripts/media/record.mjs
	node scripts/media/encode-video.mjs
	scripts/media/stack.sh down

release-check: ## Release gate after `make build`: founder decisions, audit, media rights, claims, SEO
	pnpm release:check

cloudflare-audit: ## Read-only Cloudflare settings audit; run with CLOUDFLARE_API_TOKEN=... (not stored)
	node scripts/cloudflare-audit.mjs
