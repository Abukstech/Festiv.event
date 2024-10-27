import { pipeline, TextGenerationPipeline } from "@huggingface/transformers";

type PipelineType = TextGenerationPipeline
type PipelineTaskType =  'text-generation' 

class PipelineSingleton {
    static task: PipelineTaskType = 'text-generation';
    static model = 'Xenova/distilgpt2';
    static instance: PipelineType | null = null;

    static async getInstance(progress_callback?: (progress: number) => void): Promise<PipelineType> {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, {
                progress_callback,
                dtype: 'fp32' // Explicitly specify the dtype here (or 'fp16' if supported on your hardware)
            }) as PipelineType;
        }
        return this.instance;
    }
}


let PipelineSingletonInstance: typeof PipelineSingleton;

if (process.env.NODE_ENV !== 'production') {
    if (!(global as any).PipelineSingletonInstance) {
        (global as any).PipelineSingletonInstance = PipelineSingleton;
    }
    PipelineSingletonInstance = (global as any).PipelineSingletonInstance;
} else {
    PipelineSingletonInstance = PipelineSingleton;
}

export default PipelineSingletonInstance;
