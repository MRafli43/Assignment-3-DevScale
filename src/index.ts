import { Agent, createSummaryMemoryCompactor } from "@anvia/core";
import { getModel } from "./models.js";
import { BASE_INSTRUCTIONS } from "./prompts.js";
import { Studio } from "@anvia/studio";
import { memoryStore } from "./memory.js";
import { contentIdeaTool, scriptMaker, technicalShootTool } from "./tools/video-idea.js";

const model = getModel("gpt-5.6-luna");
const summaryModel = getModel("glm-5.3");

const memoryCompactor = createSummaryMemoryCompactor({
    model: summaryModel,
});

const agent = new Agent({
    id: "assistant",
    model,
    instructions: BASE_INSTRUCTIONS,
    tools: [contentIdeaTool, scriptMaker, technicalShootTool],
    memory: {
        store: memoryStore,
        savePolicy: "turn",
        compaction: {
            compactor: memoryCompactor,
            trigger: { afterTokens: 200 },
        },
    },
});

const studio = new Studio ([agent]).start();