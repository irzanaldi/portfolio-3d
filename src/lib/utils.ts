export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}
