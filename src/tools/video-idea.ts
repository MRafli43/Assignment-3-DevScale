import { createTool } from "@anvia/core";
import { z } from "zod";

const ContentIdeaOutputSchema = z.object({
    title: z.string(),
    idea: z.string(),
});

export const contentIdeaTool = createTool({
    name: "contentIdea",
    description: "Use this tool to create a video content idea with a title and a narrative concept",
    inputSchema: z.object({
        topic: z.string(),
    }),
    outputSchema: ContentIdeaOutputSchema,

    execute: async (args) => {               
        return {
            title: `Ide kontent tentang ${args.topic}`,
            idea: `Buat video tentang ${args.topic} yang menarik seperti George R.R. Martin`,
        };
    },
});

const ScriptSceneSchema = z.object({
    scene: z.number(),
    characters: z.array(z.string()),
    dialogue: z.string(),
    atmosphere: z.string(),
});

const ScriptMakerOutputSchema = z.object({
    scenes: z.array(ScriptSceneSchema),
});

export const scriptMaker = createTool({
    name: "scriptMaker",
    description: "Use this tool to create a scene-by-scene video script based on a content idea. Each scene contains characters, dialogue, and atmosphere.",
    inputSchema: ContentIdeaOutputSchema,
    outputSchema: ScriptMakerOutputSchema,

    execute: async (args) => {               
        return {
            scenes: [
                {
                    scene:1,
                    characters: ["Alex"],
                    dialogue: `Siapakah sebenarnya ${args.title} ?`,
                    atmosphere: "Sangat menarik",
                },
                {
                    scene:2,
                    characters: ["Alex"],
                    dialogue: args.idea,
                    atmosphere: "Mencermati dengan baik",
                },
                {
                    scene:3,
                    characters: ["Alex"],
                    dialogue: "Sekarang sudah tahu tentang itu kan",
                    atmosphere: "Bangga",
                },
            ],
        };
    },
});

const TechnicalSceneSchema = z.object({
    scene: z.number(),
    shotType: z.string(),
    cameraMovement: z.string(),
    characterPosition: z.string(),
    objectPosition: z.string(),
});

const TechnicalShootOutputSchema = z.object({
    scenes: z.array(TechnicalSceneSchema),
});

export const technicalShootTool = createTool({
    name: "technicalShoot",
    description: "Use this tool to create a scene-by-scene technical shooting plan based on a video script. Each scene describes the shot type, camera movement, character position, and object position",
    inputSchema: ScriptMakerOutputSchema,
    outputSchema: TechnicalShootOutputSchema,

    execute: async (args) => {               
        return {
            scenes: args.scenes.map((scene) => ({
                scene: scene.scene,
                shotType: "Medium Shot",
                cameraMovement: "Medium Shot",
                characterPosition: "Karakter berada di tengah frame",
                objectPosition: "Objek pendukung berada di sisi frame tampak blur",
            })),
        };
    },
});