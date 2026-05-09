# From Frontend Developer to AI Application Engineer
## A 5-Year Roadmap for a Vue/React Dev with 3.5 Years of Experience

> **Read this first.** This is not a "study list." It's a path designed around one constraint: you will be doing this *alongside a full-time job*, not in a sabbatical. Every recommendation respects that. The total active learning load is ~10–15 hours per week. The total elapsed time to "I am hireable as an AI application engineer" is **18 months**, with the remainder of the 5 years being depth, specialization, and seniority.
>
> **What you are becoming:** an *AI application engineer* — a software engineer who builds production products on top of foundation models (LLMs, vision models, etc.). You are NOT becoming an ML researcher or a model trainer. That is a different career path requiring a different (longer, math-heavy) investment, and it's the wrong bet for your background. The role you're aiming at is sometimes called "AI engineer," "GenAI engineer," "LLM engineer," or "applied AI engineer." All the same thing.

---

## Table of Contents

1. The role: what you're actually becoming
2. The mental model: why your frontend background is an asset
3. Prerequisites and honest self-assessment
4. The roadmap at a glance
5. Phase 0 — Foundations (Weeks 1–4)
6. Phase 1 — Python and the API layer (Months 1–3)
7. Phase 2 — Real LLM application engineering (Months 3–6)
8. Phase 3 — RAG, evals, and the "engineering" in AI engineering (Months 6–10)
9. Phase 4 — Agents, tools, and complex systems (Months 10–14)
10. Phase 5 — Production, infrastructure, and depth (Months 14–18)
11. Phase 6 — Specialization and seniority (Years 2–5)
12. Project portfolio: what to actually build
13. The job search: positioning, resume, interviews
14. Money: realistic costs and budgets
15. Tools and stack reference
16. Reading list (curated, not exhaustive)
17. Anti-patterns: how people waste 12 months
18. Risks, hedges, and the 5-year view

---

## 1. The role: what you're actually becoming

An **AI application engineer** builds products on top of foundation models. The work is roughly 70% software engineering and 30% knowing how the model layer behaves. Day-to-day, you do things like:

- Design and ship features powered by LLMs (chat, summarization, extraction, classification, agents)
- Build retrieval pipelines (RAG) over a company's data
- Write and maintain prompts as if they were code (versioned, tested, evaluated)
- Build evaluation harnesses to measure whether changes actually improve quality
- Optimize for latency, cost, and reliability under real traffic
- Design good UX for AI features — streaming, partial responses, error states, model uncertainty, tool approval flows
- Build agent systems that use tools and call APIs to perform multi-step tasks
- Choose between models, providers, and approaches (RAG vs. fine-tuning vs. prompting)
- Wire up observability, logging, and feedback loops

What you are **not** doing: training foundation models, doing ML research, writing CUDA kernels, or proving theorems. Some AI engineers dabble in fine-tuning, but the bar to do it well is much lower than training from scratch.

The market in 2026 is real. Job postings exist at every kind of company — startups, enterprises, agencies, consulting firms — and supply genuinely lags demand for people who can ship LLM-powered features that actually work. The boring truth is that most "AI engineers" hired in 2024–2025 were strong software engineers who happened to learn the model layer. That's exactly your trajectory.

---

## 2. The mental model: why your frontend background is an asset

Most people entering this field come from one of three backgrounds:

1. **Data scientists / ML researchers** — strong on models, weak on shipping production software, terrible at UX
2. **Backend engineers** — strong on infrastructure, weak on product, often build APIs no one wants to use
3. **Frontend engineers** (you) — strong on product and UX, often weak on the model and infra layers

The thing is: **most AI products are bad because of UX, not the model.** Streaming, latency masking, error states, "the model is uncertain" UI, tool approval flows, partial result rendering, conversation memory display, chat affordances, multi-modal inputs — these are unsolved design problems and the difference between a $20/mo product and a $200/mo product. Your background is a real moat here. Don't underestimate it.

The strategy: keep your frontend strength sharp, learn the model layer well enough to design systems on top of it, and become *full-stack on AI products*. That positioning — "I can build the entire AI product, model to UI, with strong taste on both ends" — is rare and valuable.

---

## 3. Prerequisites and honest self-assessment

Before starting, confirm where you are. Be honest with yourself; there is no benefit to skipping a gap.

**You should already have (from your 3.5y of frontend):**
- [ ] Comfortable JavaScript/TypeScript, async, promises, fetch, streaming
- [ ] Comfortable building UIs in React or Vue
- [ ] Basic Git, GitHub, deployment workflows
- [ ] Read-and-write API skills (you've consumed REST APIs)

**Likely gaps (most frontend devs have these):**
- [ ] Backend basics: HTTP servers, databases, environment management, deployment
- [ ] A second language at intermediate level (Python is the one you need)
- [ ] Comfort with the command line, Linux, Docker
- [ ] Basic statistics intuition (probability, distributions, expected value)
- [ ] Linear algebra at "I can read it without panic" level (vectors, dot products, matrix multiplication)

**Do NOT need (despite what every "ML roadmap" tells you):**
- Calculus beyond a basic intuition for derivatives
- Heavy probability theory
- Ability to derive backpropagation from scratch
- A graduate degree in anything

If your gap list is significant on the "likely gaps" side, that's fine — it's covered in Phase 0 and Phase 1.

---

## 4. The roadmap at a glance

| Phase | Duration | Focus | Outcome |
|---|---|---|---|
| 0 | Weeks 1–4 | Foundations & Python ramp | You can write Python comfortably |
| 1 | Months 1–3 | LLM API basics, first projects | First real LLM-powered app deployed |
| 2 | Months 3–6 | Prompting, structured output, streaming | A polished AI product live |
| 3 | Months 6–10 | RAG, evals, observability | A RAG system with proper evaluation |
| 4 | Months 10–14 | Agents, tools, multi-step systems | An agent that does real work |
| 5 | Months 14–18 | Production, cost, latency, fine-tuning | Job-ready portfolio + interviewing |
| 6 | Years 2–5 | Specialization and seniority | Senior AI engineer |

**Time budget:** Plan for 10–15 hours per week. Some weeks will be 5, some 20. What matters is consistency over 18 months, not heroic sprints.

**Money budget:** $50–$150/month for API credits and tooling. ~$200–$500 total for books and one or two paid courses. Most things you need are free.

---

## 5. Phase 0 — Foundations (Weeks 1–4)

**Goal:** patch the gaps so the rest of the roadmap is friction-free.

### Python (the priority)

You don't need deep Python — you need fluent Python. Aim for "I can read any Python codebase without struggling" within 4 weeks.

- Read or skim *Python Crash Course* by Eric Matthes — chapters 1–11. Skip the games.
- Then do the FastAPI tutorial start-to-finish: https://fastapi.tiangolo.com/tutorial/ — this is the framework you'll use for backend work.
- Practice: rewrite a small Vue/React side project's backend in FastAPI. Make it work.
- Learn: virtual environments (`uv` is the modern tool, replaces `pip`/`venv` for most uses), `requirements.txt` or `pyproject.toml`, basic typing with `pydantic`, `async`/`await` (these map cleanly from JS).

### Backend basics (if weak)

If you've never built a backend properly:
- HTTP, REST, status codes, headers, JSON
- A relational database — pick PostgreSQL. Learn basic SQL (SELECT, JOIN, WHERE, GROUP BY) and how to use it from code.
- Environment variables and secrets management
- One deployment platform — Railway, Render, Fly.io, or Vercel for the frontend. Pick one and learn to deploy.

### Light math (don't overdo it)

Skim, don't drown:
- 3Blue1Brown's "Essence of Linear Algebra" (YouTube, ~3 hours total). Watch episodes 1–6 minimum.
- 3Blue1Brown's "Neural networks" series (YouTube, 4 episodes). Just watch. Don't try to implement.

That's it. You can come back to math later if needed. Most AI engineers don't.

### Phase 0 checkpoint

You should be able to:
- Write a FastAPI endpoint that takes a JSON body, calls another HTTP API, and returns the result
- Run Python locally, manage dependencies, deploy a small service
- Read JS/TS and Python with equal comfort

---

## 6. Phase 1 — Python and the API layer (Months 1–3)

**Goal:** make your first real LLM applications. Get the feel of the model layer.

### Get accounts and credits

- **Anthropic API** (Claude) — claude.com → console
- **OpenAI API**
- **Google AI Studio** (Gemini) — free tier is generous
- **Groq** — free, very fast inference of open-source models, great for prototyping
- **OpenRouter** — single API across many providers, useful for comparing

Set hard spending limits on every account. $20–$50/month is plenty for learning.

### Learn the API layer (the actual one — no frameworks yet)

Start with raw API calls. **Do not start with LangChain.** Frameworks hide the things you need to understand.

Build, with raw HTTP calls or the official SDK, in this order:

1. A "hello world" — send a prompt, get a response, print it
2. A streaming version — stream tokens as they arrive (the UX foundation of every good chat app)
3. A multi-turn chat — manage message history yourself
4. A structured output extractor — given some unstructured text, extract JSON that matches a schema (use the provider's structured output / JSON mode)
5. A tool-use example — give the model a "calculator" tool and see how tool calling works mechanically
6. A vision example — send an image, get a description

Do each of these in **both Python and TypeScript**. You'll work in both languages professionally.

### Resources for this phase

- **Anthropic's docs** — read the entire "Build with Claude" section. It's well written and applies to LLMs in general, not just Claude. Topics like prompt engineering, structured outputs, and tool use are universal.
- **OpenAI's cookbook** — `github.com/openai/openai-cookbook`. Most patterns transfer.
- **Karpathy: "Intro to Large Language Models" (1-hour YouTube talk)** — watch this once you've done a few API calls. It will click.
- **Karpathy: "Deep Dive into LLMs like ChatGPT"** — longer, optional but excellent.

### Project at the end of Phase 1

**Project A — Personal AI tool, polished.** Build one thing you actually want. Examples:
- An email triager: paste in emails, get summaries + action items
- A code reviewer: paste in a diff, get focused review comments
- A structured data extractor for some domain you know (recipes, job postings, papers)

Requirements:
- Real frontend (use your Vue/React skills — make it good)
- FastAPI or Next.js backend
- Streaming responses
- Deployed publicly
- Clean repo with README

Do **not** use LangChain, LlamaIndex, or any LLM framework yet. Just the provider SDK.

### Phase 1 checkpoint

You should be able to:
- Build a streaming chat UI from scratch
- Call any major LLM API directly
- Get reliable structured output (JSON) from a model
- Understand tokens, context windows, temperature, and cost

---

## 7. Phase 2 — Real LLM application engineering (Months 3–6)

**Goal:** start doing the things that distinguish an AI engineer from "someone who wraps the OpenAI API."

### Prompt engineering, seriously

Prompting is real engineering. Good engineers iterate on prompts the way they iterate on code: with version control, tests, and metrics.

Read and internalize:
- **Anthropic's prompt engineering guide** in the docs. All of it. It's the best single resource.
- **OpenAI's prompt engineering guide** (gpt best practices doc).
- The **DeepLearning.AI short courses** "ChatGPT Prompt Engineering for Developers" and "Building Systems with the ChatGPT API" — both free, ~1.5 hours each. Skip the marketing-y ones; these two are solid.

Patterns to know cold: zero-shot, few-shot, chain-of-thought, system prompts vs. user prompts, role prompting, output formatting, prompt chaining, JSON mode and structured outputs.

### Structured output and reliability

Real apps need reliable output. Learn:
- Schema-constrained generation (`response_format`, JSON mode, structured outputs across providers)
- `pydantic` (Python) and `zod` (TypeScript) for validation
- The "instructor" library (Python) — even if you don't use it long-term, the patterns are educational
- Retry strategies when output is malformed
- The trade-off between strict schemas and model creativity

### Streaming UX (your secret weapon)

This is where you blow past most AI engineers. Build:
- Token-by-token streaming with proper backpressure
- Partial JSON streaming and parsing (Anthropic and OpenAI both support this)
- "Thinking" indicators that aren't just spinners
- Cancellation (the user clicks stop)
- Server-Sent Events (SSE) and how it works

Read: the **Vercel AI SDK** docs cover this beautifully even if you end up not using it. The patterns transfer.

### Project at the end of Phase 2

**Project B — A small but real product.** Pick something that:
- Has a real user (you, ideally — solve your own problem)
- Has more than one model call per session
- Has authentication (use Clerk, Supabase, or Better-Auth — pick one)
- Has persistence (Postgres on Supabase or Neon)
- Has at least one feature that requires structured output
- Has streaming

Examples:
- A writing assistant for a specific domain (technical docs, marketing copy, book chapters)
- A "second brain" that ingests your notes and lets you query them with citations (precursor to Phase 3 RAG work)
- A coding assistant for a specific niche (a particular framework, a particular task)
- A meeting transcription + action-item tool

### Phase 2 checkpoint

You should be able to:
- Write production-quality prompts and explain why they work
- Get reliable structured output under load
- Build streaming UX that feels good
- Reason about cost and latency for a multi-step pipeline

---

## 8. Phase 3 — RAG, evals, and the "engineering" in AI engineering (Months 6–10)

**Goal:** the two most important advanced topics in AI engineering — retrieval and evaluation. This is where you separate from hobbyists.

### Retrieval-Augmented Generation (RAG)

RAG is how you make LLMs answer questions about specific data — a company's docs, a codebase, a dataset. Most production AI products are RAG systems under the hood.

Learn, in order:

1. **Embeddings** — what they are, how to compute them (OpenAI's `text-embedding-3-small`, Cohere, Voyage), what cosine similarity means.
2. **Chunking** — how to split documents. Naive fixed-size, sentence-aware, recursive, semantic chunking. The chunking strategy often matters more than the model.
3. **Vector databases** — start with `pgvector` (Postgres extension) for everything until you have a reason not to. Learn the API of `Qdrant` and `Pinecone` for context, but don't reach for them by default. Postgres + pgvector handles 99% of cases.
4. **Hybrid search** — vector + keyword (BM25). Pure vector search is often worse than people think.
5. **Reranking** — cross-encoder rerankers (Cohere Rerank, Voyage Rerank, BGE) on top of retrieval. This is often the highest-impact upgrade.
6. **Query rewriting and HyDE** — techniques to improve retrieval before it happens.
7. **Citations and grounding** — make the model cite which retrieved chunks it used. Critical for trust.

Resources:
- **Anthropic's "Contextual Retrieval" blog post** — read it carefully, implement the technique
- **Jason Liu's blog and his "Systematically Improve Your RAG" content** — the most practical writing on the topic
- The **Pinecone Learning Center** — free, surprisingly good even if you don't use Pinecone
- *Building LLM Applications for Production* by Chip Huyen (book) — solid reference

### Evals — the hidden superpower

Most AI engineers can't do evals. Most production AI systems fail because they have no evals. If you become genuinely good at this, you are valuable.

What evals actually means: a systematic way to measure whether your AI feature is doing the thing you want, and whether changes make it better or worse.

Learn:
- How to build a small "golden dataset" — 50–200 hand-labeled examples
- Evaluation methods: deterministic (regex, JSON schema match), reference-based (BLEU, exact match — usually wrong choice), LLM-as-judge (most common in practice), human review
- How to design good LLM-judge prompts (it's harder than it looks; biased judges are common)
- A/B-style experiments on prompts and models
- CI/CD for prompts: regression tests that fail when quality drops

Tools to actually use:
- **Braintrust** — strongest commercial offering for the eval-to-CI loop. Free tier is generous.
- **Langfuse** — open-source, self-hostable. Strong tracing.
- **RAGAS** — open-source library specifically for RAG metrics (faithfulness, context precision, etc.). Use this for any RAG system.
- **Promptfoo** — open-source, good for prompt-level testing in CI.

Pick one (Braintrust if you want depth, Langfuse if you want open-source). Use it on your projects.

### Observability and tracing

You can't fix what you can't see. Production AI systems need:
- Trace every model call with inputs, outputs, latency, cost, tokens
- Group traces into sessions (a user's journey)
- Tag and filter by feature, model, user, etc.
- Capture user feedback and tie it back to specific traces

Langfuse and Braintrust both do this. Pick whichever you used for evals.

### Project at the end of Phase 3

**Project C — A serious RAG system.** Build a "chat with X" product where X is a non-trivial dataset. Examples:
- Chat with a specific documentation site (e.g., a framework's docs)
- Chat with a podcast's transcripts
- Chat with a research paper corpus in your area of interest

Requirements:
- pgvector or Qdrant
- Hybrid search (vector + keyword) with reranking
- Citations that link back to source
- Streaming
- An eval suite with at least 50 examples and scoring (faithfulness, relevance)
- Deployed and shareable
- Public writeup of what you did and what you learned

This project is the centerpiece of your portfolio. Spend real time on it.

### Phase 3 checkpoint

You should be able to:
- Build and tune a RAG system end-to-end
- Explain trade-offs between chunking strategies, retrieval methods, and rerankers
- Build an evaluation suite for any LLM feature
- Use traces to debug a misbehaving AI system

---

## 9. Phase 4 — Agents, tools, and complex systems (Months 10–14)

**Goal:** systems where the model decides what to do next, not just answers questions.

### What an agent actually is (demystified)

An agent is a loop. Roughly: `while not done: model_call(messages, tools) → execute_tool_calls → append_results → repeat`. That's it. Everything else is plumbing.

Build the loop yourself first, in plain Python or TypeScript, with no framework. Two hundred lines of code. You'll understand more than 90% of the people who go straight to LangChain.

### Tools, tool use, and MCP

- How tool schemas work in each provider's API
- How to design tool interfaces (specific, focused, well-named)
- Error handling — tools fail, models retry
- **Model Context Protocol (MCP)** — Anthropic's open standard for connecting tools to models. Adopted broadly across the industry. Learn the spec; build a small MCP server.

### Frameworks (now, not before)

Now you can pick a framework with informed eyes. The honest 2026 landscape:

- **Vercel AI SDK** (TypeScript) — best for web app integration. If your agents live inside a Next.js or React app, this is probably the right choice. Light, well-designed.
- **Mastra** (TypeScript) — newer framework that bundles agents, workflows, memory, and evals. TypeScript-native. Good fit if you want a richer framework without leaving your language.
- **LangGraph** (Python primarily, also TS) — best for complex agent control flow with branching, retries, durable state. Steeper learning curve. Most production-tested.
- **OpenAI Agents SDK** / **Claude Agent SDK** — provider-specific, smoothest integration with each platform's features.
- **Pydantic AI** (Python) — clean, type-safe, growing fast.
- **CrewAI** — multi-agent role-based; useful if your problem maps naturally to "team of agents."

Recommendation for you: pick **Vercel AI SDK** or **Mastra** as your TypeScript option (matches your strengths) and **LangGraph** as your Python option (most production weight). Become competent with both.

Avoid the trap of trying every framework. Pick two, get good at them.

### Memory and state

- Short-term: conversation history management, summarization, sliding windows
- Long-term: vector-based "memory" stores (overhyped, but real)
- Episodic vs. semantic memory patterns
- When stateful is wrong: many "memory" features are better solved by RAG over user data

### Workflows vs. agents

Often the right answer isn't an agent. It's a deterministic workflow with LLM steps inside it. Learn the difference. Read **Anthropic's "Building effective agents"** post — short, dense, essential.

Rule of thumb: if you can write the steps as a flowchart in advance, build a workflow. If the steps depend on results in unknowable ways, build an agent. Workflows are cheaper, faster, and more reliable.

### Project at the end of Phase 4

**Project D — An agent that does real work.** Pick a task with side effects on a real system. Examples:

- A research agent that searches, reads, synthesizes, and produces a structured report
- A code-modification agent on a small repo (with proper sandboxing)
- A customer-support agent that connects to a ticketing system, looks up records, and responds
- A data-pipeline agent that connects to APIs, fetches data, transforms it, and writes results

Requirements:
- Multi-step (3+ tool calls per session typically)
- Real tools with real side effects (not just toy calculators)
- An eval suite — agents are notoriously hard to evaluate; build it
- Tracing/observability
- Cost and latency budgets

### Phase 4 checkpoint

You should be able to:
- Implement an agent loop from scratch
- Choose between workflow and agent appropriately
- Build a non-trivial agent with tool use, evals, and tracing
- Reason about agent failure modes (loops, drift, tool-call errors, hallucinated tool calls)

---

## 10. Phase 5 — Production, infrastructure, and depth (Months 14–18)

**Goal:** the things that turn "I built a demo" into "I shipped a product."

### Cost engineering

- Token accounting: input vs. output, system prompts, RAG context, conversation history
- Prompt caching (Anthropic, OpenAI) — often 50–90% cost reduction with the right structure
- Model routing: cheap model for simple, expensive model for hard
- Batch APIs for non-real-time work (50% discount typically)
- When to use small open-source models for narrow tasks (Llama, Qwen, etc., via Groq or Together AI)

### Latency engineering

- Streaming everything that can stream
- Speculative decoding and prefix caching (understand them)
- Parallelizing independent calls
- Pre-warming and connection pooling
- Latency budgets per feature

### Reliability

- Retries with exponential backoff
- Fallback models when primary is down
- Rate limit handling
- Idempotency for tool calls

### Fine-tuning (lightly)

You don't need this often, but you should know:
- When fine-tuning is worth it (rarely — usually RAG or better prompting wins)
- LoRA and QLoRA at a conceptual level
- The OpenAI fine-tuning API — try it once on a small dataset
- Hugging Face basics — load a model, run inference

Don't over-invest here. The bar for foundation-model fine-tuning being the right answer is high.

### A little theory (the right amount)

You can now afford to spend 2–4 weeks getting a real feel for how transformers work:
- **Karpathy's "Neural Networks: Zero to Hero"** YouTube series — at least the first 4 lectures, ideally through "Let's build GPT". This is gold. Code along.
- **Karpathy's "Let's reproduce GPT-2"** if you have appetite — 4 hours, life-changing.

Don't aim to become an ML researcher. Aim to never feel mystified by a model again. After Karpathy, you won't be.

### The capstone

**Project E — Your portfolio centerpiece.** Take one of your earlier projects and turn it into something near-production:
- Real users (even 10 is fine)
- Cost dashboards
- Eval CI that blocks bad deploys
- Multi-model strategy
- Public writeup, ideally a blog post or two

This is the project you talk about in interviews.

### Phase 5 checkpoint

You should be able to:
- Walk into any interview and discuss prompts, RAG, evals, agents, cost, and latency from real experience
- Show 3–5 deployed projects of increasing depth
- Have at least one detailed public writeup (blog post or repo README)

At the end of Phase 5, you should be applying for jobs.

---

## 11. Phase 6 — Specialization and seniority (Years 2–5)

By month 18, you're hireable. The remaining 3.5 years are about depth and specialization. The market is moving fast; the specific specializations that pay best in 2030 aren't fully knowable, but the directions that look durable are:

- **AI infrastructure / inference** — serving models at scale, vLLM, TGI, latency optimization. Pays extremely well, harder to break into without a job that pushes you there.
- **Agent systems / agent infrastructure** — long-running, durable, multi-agent systems. Newer, shape still forming, big opportunity.
- **AI product engineering** — your natural sweet spot given frontend background. The "AI is the product" companies will pay a premium for people with strong product taste plus model fluency.
- **Vertical AI (legal, medical, finance, etc.)** — combine deep domain knowledge + AI engineering. Often the most lucrative path long-term, lower competition.
- **Evaluation and AI quality engineering** — emerging specialty, especially in regulated industries.
- **Voice and multimodal** — voice agents, vision-heavy applications. Different stack (real-time audio, latency requirements).

Pick your direction by the end of year 2 based on the work you're actually doing in your job. Until then, keep your projects diverse.

What seniority looks like at year 5: you can architect AI systems, not just implement features. You can mentor others. You can make build vs. buy decisions on AI infrastructure. You can talk credibly to executives about AI strategy. You're paid accordingly.

---

## 12. Project portfolio: what to actually build

By month 18 you should have **5 deployed projects**:

1. **A polished personal AI tool** (Phase 1) — shows API basics, frontend, streaming
2. **A small SaaS-shaped product** (Phase 2) — shows full-stack depth, structured output
3. **A serious RAG system with evals** (Phase 3) — your centerpiece
4. **An agent that does real work** (Phase 4) — shows complexity handling
5. **Capstone (productionized)** (Phase 5) — shows production thinking

Plus, ideally:
- 2–4 blog posts about specific things you learned
- An active GitHub
- A simple personal site listing the above

Don't build 20 projects. Build 5 good ones with real depth.

---

## 13. The job search: positioning, resume, interviews

### Positioning

You are: **"Full-stack engineer with X years frontend experience and Y months building production AI applications. Strong on UX of AI products, comfortable across the stack from prompts to RAG to deployment."**

This is more compelling than "frontend dev who learned AI" or "junior AI engineer."

### Resume

- Lead with one strong project, briefly described, with metrics where possible (latency, cost, eval scores, users)
- Then your day job, framed in product/impact terms not framework lists
- Skills section listing the concrete stack: Claude/GPT/Gemini APIs, pgvector/Qdrant, Braintrust/Langfuse, FastAPI, Next.js, etc.
- Link to the projects. Recruiters click links.

### Interview prep

AI engineering interviews vary wildly but typically include:
- A coding round (regular DSA — yes, still)
- A system design round (often: "design a customer support AI" or similar)
- An AI-specific round: prompt design, evals, RAG architecture, when-not-to-use-an-agent
- A behavioral round

For the AI round, be ready to discuss:
- A project in real depth — what failed, what you tried, what worked
- Cost and latency trade-offs you've made
- How you'd evaluate a hypothetical feature
- When you'd pick RAG vs fine-tuning vs prompting alone

### Where to apply

- AI-native startups (post-seed, Series A — the sweet spot for learning)
- Larger companies adding AI teams (less learning, more pay/stability)
- Consulting/agencies doing AI work (variety, but exhausting)
- Avoid the very tiny seed-stage "vibes-based" AI startups unless you love chaos

### Compensation note

Compensation for AI engineers in 2026 is volatile and varies massively by region. Don't anchor on a number; do anchor on "above what I make as a frontend developer, with much higher upper bound."

---

## 14. Money: realistic costs and budgets

### Monthly running costs during the 18 months

| Item | Monthly | Annual |
|---|---|---|
| LLM API credits | $30–80 | $400–1000 |
| Vector DB / hosting (Supabase free tier or paid) | $0–25 | $0–300 |
| Deployment (Vercel, Railway, Fly free tiers cover most) | $0–20 | $0–250 |
| Eval/observability (Braintrust/Langfuse free tier covers most) | $0 | $0 |
| Domain names | $1 | $12 |
| **Total** | **$30–125** | **$400–1500** |

### One-time / occasional

- 2–3 books: $80–120
- One paid course if you find one valuable (DeepLearning.AI is mostly free; Maven/cohort courses run $500–2000): optional
- Total optional: $100–500

### What NOT to spend on

- Bootcamps. Not worth it for someone with 3.5y experience.
- Generic "AI Engineer Certification" courses sold by content marketers. These are mostly low-signal.
- Heavy MLOps tooling subscriptions. Use free tiers for years.
- Multiple vector database paid plans. pgvector + Supabase is enough.

---

## 15. Tools and stack reference

### Models (have accounts at all)

- **Anthropic** Claude (Sonnet for most things, Opus for hardest, Haiku for cheap)
- **OpenAI** GPT family
- **Google** Gemini (best free tier)
- **Groq** (fast OSS models, free tier)
- **Together AI** or **Fireworks** (OSS models in production)
- **OpenRouter** (one API to rule them all)

### Backend

- **Python**: FastAPI, pydantic, `uv` for env management
- **TypeScript**: Next.js (App Router), Vercel AI SDK or Mastra

### Database / vector

- **Postgres** with **pgvector** (Supabase or Neon for hosted) — your default
- **Qdrant** as a step up if needed
- **Pinecone** mostly when a customer mandates it

### Observability and evals

- **Langfuse** (open source, self-hostable) or **Braintrust** (commercial, generous free tier)
- **RAGAS** for RAG-specific metrics

### Agent frameworks

- **Vercel AI SDK** (TS) — your default for web apps
- **Mastra** (TS) — when you need more framework
- **LangGraph** (Python) — when you need durable, complex flows

### Deployment

- **Vercel** for frontends and most Next.js work
- **Railway** or **Fly.io** for Python services
- **Modal** or **Replicate** if you need to run actual model inference

### Other essentials

- **MCP** (Model Context Protocol) — learn it, it's becoming standard
- **Cursor**, **Claude Code**, or another agentic coding tool — use these to *build*, not just to study. Move 2x faster.

---

## 16. Reading list (curated, not exhaustive)

### Actually-essential

- Anthropic's "Build with Claude" docs (entire section)
- Anthropic's "Building effective agents" blog post
- Anthropic's "Contextual Retrieval" blog post
- OpenAI Cookbook (browse, dip in)
- Karpathy's "Neural Networks: Zero to Hero" YouTube series
- Karpathy's "Intro to Large Language Models" (1-hour video)
- Chip Huyen's blog at huyenchip.com (every post on AI engineering)
- Eugene Yan's blog at eugeneyan.com (writes about AI eval and RAG with depth)
- Hamel Husain's blog (especially on evals)
- Jason Liu's blog (RAG systematic improvement)

### Books worth buying

- *Building LLM Applications for Production* — Chip Huyen
- *AI Engineering* — Chip Huyen (a more comprehensive version, 2024)
- *Designing Machine Learning Systems* — Chip Huyen (older but still relevant for systems thinking)

### Skim, don't drown

- Andrew Ng's "Machine Learning Specialization" on Coursera — only if you feel a real gap
- *Deep Learning* by Goodfellow — reference, not a read-through
- Specific papers (Attention Is All You Need, RAG paper, ReAct paper) — read the abstracts and intros, dive deeper only when curious

### Avoid

- Most "Top 10 AI Tools" listicles
- Anything pitching itself as a "complete AI engineer course" for $999
- Dense ML textbooks unless you have a specific reason

---

## 17. Anti-patterns: how people waste 12 months

The common ways smart people fail this transition:

1. **Going deep on math and ML theory first.** Months disappear into linear algebra and probability. By the time they touch an LLM API, the field has moved. **Fix:** start building in week 4, study theory only when a real problem demands it.

2. **Tutorial-hopping.** A new framework every weekend, no real project. **Fix:** pick a project, finish it, ship it. The framework you used barely matters.

3. **Reaching for LangChain on day one.** Hides the fundamentals. You learn LangChain, not LLMs. When LangChain changes (it does, often), you have nothing underneath. **Fix:** raw API for 3 months minimum.

4. **Skipping evals.** Without evals, you don't know if anything works. You optimize on vibes. Most "production AI apps" are like this and they all break the same way. **Fix:** by month 6, every project has an eval suite, even a small one.

5. **Building chatbots forever.** Chat UI is the easiest to build and the least valuable to ship. **Fix:** by month 6, build something that isn't a chatbot — extraction, agent, workflow, classifier.

6. **Trying to become an ML researcher.** Reading transformer papers and reproducing them. Six months later, you can do papers but can't ship. **Fix:** Karpathy's series gives you 90% of useful theory in 20 hours.

7. **Building 20 toy projects.** Quantity over depth. Each one is shallow, none are impressive. **Fix:** 5 real projects, increasing in depth.

8. **Quitting the day job too early.** The day job funds this transition and keeps your software engineering sharp. **Fix:** keep it until you have offers in hand.

9. **Not writing publicly.** Nobody finds you. Fix this with one post per phase. Even short ones.

10. **Treating AI as "just another framework."** It isn't. Models are stochastic. Pipelines drift. Costs creep. You have to think differently. **Fix:** internalize that this is a new engineering discipline, not just a new library.

---

## 18. Risks, hedges, and the 5-year view

### What could go wrong

**Risk:** "AI engineer" becomes commoditized — everyone is one, market wages compress.
**Hedge:** Specialize by year 2. The generalist AI engineer might commoditize; the AI engineer who is *also* the best person at evals, or the best person at voice agents, or the best person at AI in healthtech, won't.

**Risk:** The current LLM paradigm hits a wall. Models stop getting much better. Investment slows.
**Hedge:** Even in this scenario, demand for engineers who can ship products on existing models stays high. The infrastructure exists, the products are still being built.

**Risk:** Foundation models become so good that "AI engineering" becomes "regular engineering."
**Hedge:** This is actually the most likely outcome over 5 years, and it's good for you. The skills you build (product taste, integration, reliability, evals) are exactly what carries forward. You're future-proof either way.

**Risk:** You burn out trying to do this on top of a full-time job.
**Hedge:** Take it seriously as a sustainability problem. 10–15 hours/week, not 30. Skip a week when life happens. The 18 months can become 24; what matters is the trajectory.

### The 5-year view, honestly

In 5 years, the most likely scenarios are:

- AI engineering is a mature, well-paid specialty with clear seniority ladders. You're a senior IC or a tech lead, doing the work you trained for. Most likely outcome.
- AI engineering has been absorbed into generalist senior engineering, but people who started early (you) have years of advantage and command a premium.
- The field has surprised everyone in some way (good or bad). Adaptive engineers do fine; the skills compound.

In all three, this is a better bet than going deeper into Vue or React.

### A final encouragement

You have an unusual advantage. Most people coming into AI engineering are either backend-heavy (and ship products with bad UX) or come from research backgrounds (and can't ship at all). You can ship full products. Add the model layer to that, and you're rare.

The path is real. The work is interesting. Eighteen months of consistent effort gets you somewhere very few people are. Five years gets you somewhere quite few people will ever be.

Start with Phase 0 this week. Don't optimize the plan; execute it.

---

## Appendix A — Week-1 checklist

Right now, this week:

- [ ] Create accounts: Anthropic, OpenAI, Google AI Studio, Groq, OpenRouter, GitHub (you have it), Supabase, Vercel
- [ ] Set $20 spending limits on each LLM provider
- [ ] Install: Python 3.11+, `uv`, Node 20+, Cursor or Claude Code, Postgres locally (or use Supabase)
- [ ] Watch: Karpathy's "Intro to Large Language Models" (1 hour)
- [ ] Read: Anthropic's "Build with Claude" intro page
- [ ] Make: a Python script that calls Claude with a prompt and prints the response
- [ ] Make: the same thing in TypeScript (Node)
- [ ] Make: the same thing again, but streaming
- [ ] Open a notebook (literal or digital) — you'll be tracking 18 months of work; some structure helps

Welcome to the next chapter of your career.

---

*Last updated: based on the AI engineering landscape as of May 2026. The specific tools will shift; the structure of the path is durable.*
