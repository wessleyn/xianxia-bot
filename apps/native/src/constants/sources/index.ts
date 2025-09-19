import { normalizeText } from "../../utils/normalizeText"
import { SourceDefinition } from "../types"
import { NovelBin } from "./novelBin"

const sources: { [key: string]: new () => SourceDefinition } = {
    [normalizeText(NovelBin.name)]: NovelBin,
}

export default sources