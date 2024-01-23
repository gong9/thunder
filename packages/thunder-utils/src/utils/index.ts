export const getLastValue = <T>(optsValue: T | undefined | null, value: T): T => {
  return optsValue ?? value
}