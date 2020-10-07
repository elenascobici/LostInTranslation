interface IReply {
    responseData: IResponse;
}
interface IResponse {
    translatedText: string;
}
declare let runOnce: boolean;
declare function Translate(): Promise<void>;
declare let targetLanguages: Array<string>;
declare function AddLanguage(): void;
declare function SendRequest(sourceText: string, sourceLanguage: string, targetLanguage: string): Promise<string>;
declare function Reset(): void;
//# sourceMappingURL=index.d.ts.map