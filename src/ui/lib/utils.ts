import { PlatformParams } from '../../shared/api'


export function makePlatformAPIArg(platformParmas: PlatformParams) {
  let platform = ''

  if (platformParmas.midjourney) {
    platform = platform + 'midjourney,'
  } 
  if (platformParmas.stableDiffusion)  {
    platform = platform + 'stable-diffusion,'
  }
  return platform
}
