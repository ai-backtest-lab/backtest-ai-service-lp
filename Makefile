.PHONY: setup build dev preview stop status check browser-check capture-assets
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
