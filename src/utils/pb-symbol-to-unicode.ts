import { Symbol } from "../generated/proto/keypad_module.pb";

export function pbSymbolToUnicode(symbol?: Symbol): string {
    switch (symbol) {
        case Symbol.COPYRIGHT:
            return "©";
        case Symbol.FILLED_STAR:
            return "★";
        case Symbol.HOLLOW_STAR:
            return "☆";
        case Symbol.SMILEY_FACE:
            return "ټ";
        case Symbol.DOUBLE_K:
            return "Җ";
        case Symbol.OMEGA:
            return "Ω";
        case Symbol.SQUID_KNIFE:
            return "Ѭ";
        case Symbol.PUMPKIN:
            return "Ѽ";
        case Symbol.HOOK_N:
            return "ϗ";
        case Symbol.SIX:
            return "б";
        case Symbol.SQUIGGLY_N:
            return "Ϟ";
        case Symbol.AT:
            return "Ѧ";
        case Symbol.AE:
            return "æ";
        case Symbol.MELTED_THREE:
            return "Ԇ";
        case Symbol.EURO:
            return "Ӭ";
        case Symbol.N_WITH_HAT:
            return "Ҋ";
        case Symbol.DRAGON:
            return "Ѯ";
        case Symbol.QUESTION_MARK:
            return "¿";
        case Symbol.PARAGRAPH:
            return "¶";
        case Symbol.RIGHT_C:
            return "Ͼ";
        case Symbol.LEFT_C:
            return "Ͽ";
        case Symbol.PITCHFORK:
            return "Ψ";
        case Symbol.CURSIVE:
            return "Ҩ";
        case Symbol.TRACKS:
            return "҂";
        case Symbol.BALLOON:
            return "Ϙ";
        case Symbol.UPSIDE_DOWN_Y:
            return "ƛ";
        case Symbol.BT:
            return "Ѣ";
    }

    console.warn(`Unknown symbol: ${symbol}`);
    return "";
}
