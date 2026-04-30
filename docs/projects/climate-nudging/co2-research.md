<small>**Project:** Climate Awareness Nudging</small>

# CO2 and Energy Estimates for LLM Inference

## Summary

Per-query energy for modern LLMs ranges from **~0.05 Wh** (small models) to **~4 Wh** (large unoptimized models), with a current best estimate of **~0.3 Wh for a typical ChatGPT query** (GPT-4o, confirmed by both Epoch AI and Sam Altman). CO2 per query varies from **0.03g to 10g+** depending heavily on grid carbon intensity, hardware, and model size.

The single most important finding: **estimates in the literature disagree by up to 200x**, mostly due to different assumptions about hardware, utilization, grid mix, and what overhead is included. This makes transparency from hosting providers essential.

---

## 1. Published Research

### Key papers

| Paper | Year | Focus | Key finding |
|---|---|---|---|
| Strubell et al., "Energy and Policy Considerations for Deep Learning in NLP" (ACL) | 2019 | Training | Single large training run: up to ~500t CO2e. Catalyzed "Green AI" movement. |
| Patterson et al., "Carbon Emissions and Large Neural Network Training" (arXiv) | 2021 | Training | External estimates were off by 100x–100,000x. At Google, ML was 10–15% of total energy. |
| Patterson et al., "Carbon Footprint of ML Training Will Plateau, Then Shrink" (IEEE) | 2022 | Training | Four best practices can reduce training energy 100x and CO2 1000x. |
| de Vries, "The growing energy footprint of AI" (Joule) | 2023 | Projections | Projected AI electricity: +85–134 TWh/year by 2027. Warned of Jevons' Paradox. |
| Luccioni et al., "Power Hungry Processing" (ACM FAccT) | 2024 | Inference | BLOOM-176B: ~4 Wh/query. BLOOMz-7B: ~0.1 Wh. BLOOMz-560M: ~0.054 Wh. |
| Epoch AI, "How much energy does ChatGPT use?" | 2025 | Inference | GPT-4o: ~0.3 Wh/query. Assumes H100, ~10% utilization, ~500 output tokens. |
| IEA, "Energy and AI" report | 2025 | Industry-wide | Data centers: ~415 TWh (2024), projected ~945 TWh by 2030. AI: 5–15% now, possibly 35–50% by 2030. |
| TokenPowerBench (arXiv 2512.03024) | 2025 | Benchmarking | Systematic benchmarking of power per token across models and hardware. |
| "How Hungry is AI?" (arXiv 2505.09598) | 2025 | Comparison | o3/DeepSeek-R1 long prompts: >33 Wh. GPT-4.1 nano: ~70x less than o3. |

### Hannah Ritchie's perspective (May 2025)

Ritchie calculated that 10 ChatGPT queries/day for a UK resident equals ~0.03% of daily electricity use. Abstaining from 50,000 queries (~14 years at 10/day) saves less CO2 than everyday actions like recycling. However, she distinguishes individual footprint from aggregate industry impact — the concern is systemic growth, not individual queries.

### Measurement tools

[**Carbontracker**](https://carbontracker.info/) (Anthony, Kanding & Selvan, 2020) is the most established open-source tool for measuring and predicting the carbon footprint of ML workloads. It samples hardware power draw and combines it with regional grid carbon intensity to produce real-time and predicted-total emissions estimates, with low overhead via separate threads. It supports Intel CPUs, NVIDIA GPUs and Apple silicon, ships as both a CLI and a Python library, and includes log-parsing helpers for third-party integration. Originally created at the University of Copenhagen and now maintained there with EU Horizon Europe support, the original paper has been cited 470+ times. Carbontracker is aimed at training workloads; applying it to inference is straightforward in principle but, as section 5 notes, requires hosting providers to expose the underlying telemetry.

---

## 2. Per-Query Estimates by Model

| Model / System | Energy per query | CO2 per query | Notes |
|---|---|---|---|
| GPT-4o (ChatGPT average) | ~0.3–0.42 Wh | 0.03–4.3g | Depends entirely on grid |
| GPT-4 (older estimates) | ~0.5 Wh | 1.5–9.5g | Varies by source |
| Google Gemini (median text) | ~0.24 Wh | ~0.03g CO2e | Google sustainability report; clean grid |
| BLOOM-176B | ~4 Wh | — | Luccioni et al.; unoptimized deployment |
| Llama-class 70B | ~0.1–0.4 Wh | — | Depends on quantization, hardware |
| Llama-class 7B | ~0.05–0.1 Wh | — | Significantly cheaper |
| Small models (<1B) | ~0.05 Wh | — | Minimal |
| o3 / reasoning models (long) | >33 Wh | — | 70x+ more than nano models |
| Google Search (traditional) | ~0.04–0.3 Wh | ~0.02–0.2g | For comparison |

**Key insight**: The same query on the same model can produce **13x different CO2** depending on the data center region, due to grid carbon intensity differences. California's grid swings from <70 to >300 gCO2/kWh within a single day.

---

## 3. What Determines Actual CO2

Ranked roughly by impact:

| Factor | Impact | Notes |
|---|---|---|
| **Grid carbon intensity** | 10–40x variation | Nordic hydro: ~20 gCO2/kWh. Coal grids: >800 gCO2/kWh. |
| **Model size** | ~7x from 1B to 70B | Energy per token scales super-linearly with parameters. |
| **GPU hardware generation** | ~120x improvement over 5 years | V100/A100 → H100 is dramatic. |
| **Context length** | ~3x from 2K to 10K tokens | Longer context = more compute per token. |
| **Reasoning mode** | 70x+ for reasoning vs. nano | o3 vs. GPT-4.1 nano. |
| **Quantization** | Up to ~2x savings | FP8 on H100 reduces Llama3-70B to ~0.39 J/token. |
| **Data center PUE** | 1.1–1.6x | Hyperscalers: ~1.1. Less efficient: 1.4–1.6. |
| **GPU utilization rate** | Significant but hard to measure | Most assume ~10% utilization; higher is more efficient per query. |
| **Inference framework** | Meaningful differences | vLLM, TensorRT-LLM, DeepSpeed yield different efficiency. |
| **Embodied carbon** | 24–35% of lifecycle | Hardware manufacturing is significant but rarely reported. |

---

## 4. Everyday Equivalences

| Activity | Energy | CO2 | Source |
|---|---|---|---|
| 1 LLM query (typical) | ~0.3 Wh | 0.03–4.3g | Epoch AI; various |
| 1 Google search | ~0.04–0.3 Wh | ~0.02–0.2g | Google; various |
| Boiling a kettle (1 cup) | ~100 Wh | ~15g | Common estimate |
| Toasting a slice of bread | ~50 Wh | ~30g | Common estimate |
| 1 min hot shower | ~500 Wh | ~90g | Common estimate |
| 1 hour Netflix streaming | ~70 Wh | ~36g | Various |
| 1 km by car | — | ~120g | IPCC average |
| Washing machine cycle | ~500 Wh | ~500g | Common estimate |
| Sending an email | — | ~4g | Berners-Lee estimate |

**Note on equivalences**: These are useful for intuition but all carry significant uncertainty. We should present them as rough comparisons, not precise conversions. Consider showing ranges.

---

## 5. Guidance to Hosting Providers

### What we need from you

To provide users with qualified, honest estimates of the climate impact of their AI usage, we need hosting providers to disclose the following data:

#### Essential (minimum for any estimate)

1. **GPU hardware model** — exact model (e.g., NVIDIA H100 SXM5, A100 80GB). This determines the power envelope and computational efficiency.
2. **Average GPU utilization during inference** — actual measured utilization, not provisioned capacity. Even a rough bucket (low: <20%, medium: 20–60%, high: >60%) helps.
3. **Data center location** — country and region, so we can look up grid carbon intensity.
4. **Facility PUE** — Power Usage Effectiveness. Ideally measured, not just the design target. (ISO/IEC 30134-2 standard.)
5. **Electricity source** — grid mix at the facility location. If renewable energy is procured, whether it's direct PPAs, on-site generation, or purchased RECs matters significantly.

#### Valuable (for better estimates)

6. **Quantization level** — FP16, FP8, INT4, etc. This affects energy per token significantly.
7. **Inference framework** — vLLM, TensorRT-LLM, etc. and batching strategy.
8. **Average tokens per query** — input and output separately. Output tokens are more expensive.
9. **Carbon Usage Effectiveness (CUE)** — total CO2 emissions / IT energy consumed.
10. **Water Usage Effectiveness (WUE)** — water is a separate environmental concern (~30ml per ChatGPT query estimated).

#### Ideal (for full transparency)

11. **Time-resolved grid carbon intensity** — hourly or daily, not just annual average.
12. **Embodied carbon of hardware** — manufacturing emissions amortized over expected lifetime.
13. **Total electricity consumed for AI workloads** — annually, broken down by inference vs. training.
14. **Per-query energy telemetry** — even aggregated/anonymized averages would be valuable.

### Why this matters

Currently, **no major AI provider publishes complete, verifiable, per-query energy and emissions data.** Cloud sustainability dashboards report at account level, not workload level. Sustainability reports lag 3–6 months and lack AI-specific breakdowns. One analysis found Big Tech data centers may emit up to 662% more CO2 than publicly reported.

Without provider transparency, all per-query CO2 estimates are educated guesses. We can improve from "somewhere between 0.03g and 10g" to a narrower range with even basic disclosures from the list above.

### A modest proposal

We're not asking providers to solve climate change. We're asking for enough data to give users an honest, order-of-magnitude estimate. Even a simple API response header like:

```
X-Estimated-Energy-Wh: 0.3
X-GPU-Model: H100
X-Data-Center-Region: eu-north-1
```

...would transform the accuracy of user-facing climate awareness tools.

---

## 6. Gaps, Uncertainties, and Controversies

### The 200x disagreement

Published CO2 estimates per query range from 0.03g to ~68g. This is not a rounding error — it reflects fundamentally different:
- Models being measured (GPT-3.5 vs. GPT-4 vs. GPT-4o vs. reasoning models)
- Hardware assumptions (A100 vs. H100)
- Utilization assumptions (10% vs. production loads)
- Scope (GPU only vs. full infrastructure vs. embodied carbon)
- Grid carbon intensity (Nordic vs. global average vs. coal)

### Bottom-up vs. top-down

Bottom-up estimates (GPU power x time x PUE x grid factor) consistently yield lower numbers than top-down estimates (total company energy / number of queries). The gap suggests bottom-up approaches miss significant overhead — networking, storage, redundancy, cooling spikes, idle power.

### Efficiency vs. total demand (Jevons' Paradox)

Google claims 33x reduction in energy per median prompt over 12 months. But total AI energy consumption continues rising because usage grows faster than efficiency improves. De Vries (2023) explicitly warned of this pattern. Both things can be true: AI is getting more efficient *and* consuming more total energy.

### Corporate reporting concerns

- Microsoft's CO2 rose 30% since 2020; Google's rose 50% since 2019 — both driven by data center expansion.
- Companies claim carbon neutrality via purchased credits while local emissions go unreported.
- One analysis found reported emissions may understate actual emissions by up to 662%.

### What we don't know

- Actual GPU utilization rates at major providers (trade secret)
- Real-world energy for proprietary models (GPT-4, Claude, Gemini) — all estimates are inferred
- How reasoning models (o1, o3, Claude with extended thinking) change the energy distribution
- Whether projected AI energy demand will fully materialize — investment ($300–400B) far exceeds current revenue

---

## Sources

1. Luccioni, A. et al. (2024). "Power Hungry Processing: Watts Driving the Cost of AI Deployment?" ACM FAccT. [arXiv:2311.16863](https://arxiv.org/pdf/2311.16863)
2. Strubell, E. et al. (2019). "Energy and Policy Considerations for Deep Learning in NLP." ACL. [Paper](https://aclanthology.org/P19-1355/)
3. Patterson, D. et al. (2021). "Carbon Emissions and Large Neural Network Training." [arXiv:2104.10350](https://arxiv.org/abs/2104.10350)
4. Patterson, D. et al. (2022). "Carbon Footprint of ML Training Will Plateau, Then Shrink." IEEE Computer. [arXiv:2204.05149](https://arxiv.org/abs/2204.05149)
5. de Vries, A. (2023). "The growing energy footprint of artificial intelligence." Joule, 7(10), 2191–2194. [Paper](https://www.cell.com/joule/fulltext/S2542-4351(23)00365-3)
6. IEA (2025). "Energy and AI." [Report](https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai)
7. Epoch AI (2025). "How much energy does ChatGPT use?" [Article](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use/)
8. Ritchie, H. (2025). "What's the carbon footprint of using ChatGPT?" [Substack](https://hannahritchie.substack.com/p/carbon-footprint-chatgpt)
9. TokenPowerBench (2025). "Benchmarking Power Consumption of LLM Inference." [arXiv:2512.03024](https://arxiv.org/html/2512.03024v1)
10. "How Hungry is AI? Benchmarking Energy, Water, and Carbon Footprint" (2025). [arXiv:2505.09598](https://arxiv.org/html/2505.09598v1)
11. "Why transparency matters for sustainable data centers" (2025). iScience. [Paper](https://www.cell.com/iscience/fulltext/S2589-0042(25)01966-2)
12. Federation of American Scientists. "Measuring AI's Energy Footprint." [Report](https://fas.org/publication/measuring-and-standardizing-ais-energy-footprint/)
13. Anthony, L. F. W., Kanding, B. & Selvan, R. (2020). "Carbontracker: Tracking and Predicting the Carbon Footprint of Training Deep Learning Models." [arXiv:2007.03051](https://arxiv.org/abs/2007.03051) · [Project site](https://carbontracker.info/)
