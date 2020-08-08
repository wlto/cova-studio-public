import { CustomEase } from "gsap/CustomEase"
import gsap from "gsap"
gsap.registerPlugin(CustomEase)

CustomEase.create(`easeIn`, `0.55, 0.05, 0.67, 0.19`)
CustomEase.create(`easeOut`, `0.22, 0.61, 0.35, 1`)
CustomEase.create(`easeBoth`, `0.64, 0.04, 0.35, 1`)
CustomEase.create(`linear`, `0, 0, 1, 1`)