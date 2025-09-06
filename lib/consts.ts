import { ImageSourcePropType } from "react-native";


export type CoverEnum =    "exercise" | 
                    "travel" |
                    "learnSkills" |
                    "education" | 
                    "personal" |
                    "creative" ; 
                    // "financial" | 
                    // "relationships" | 
                    // "hobbies" | 
                    // "productivity" | 
                    // "mindfulness";


export const COVERS : Record<CoverEnum, ImageSourcePropType> = {
    exercise: require("@/assets/covers/exercise.png"),
    travel: require("@/assets/covers/travel.png"),
    learnSkills: require("@/assets/covers/learn-skills.png"),
    education: require("@/assets/covers/education.png"),
    personal: require("@/assets/covers/personal.png"),
    creative: require("@/assets/covers/creative.png"),
    // financial: require("@/assets/covers/financial.png"),
    // relationships: require("@/assets/covers/relationships.png"),
    // hobbies: require("@/assets/covers/hobbies.png"),
    // productivity: require("@/assets/covers/productivity.png"),
    // mindfulness: require("@/assets/covers/mindfulness.png"),

}


