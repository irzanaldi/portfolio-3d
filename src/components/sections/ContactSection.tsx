const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/irzanaldi' },
  { label: 'irzanaldi@gmail.com', href: 'mailto:irzanaldi@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/irzan-aldi-ananto-688819214' },
  { label: 'Résumé (PDF)', href: '/resume.pdf' },
];

export function ContactSection() {
  return (
    <footer id="contact" className="relative mt-[30px] border-t border-[var(--line)] px-6 py-[68px] pb-[90px]">
      <div className="max-w-6xl mx-auto">
        <h2 className="max-w-[16ch] font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.4rem)] font-semibold tracking-[-.02em]">
          Want the <span className="grad-text">live ones</span>, or the code?
        </h2>
        <div className="mt-[22px] flex flex-wrap gap-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="rounded-full border border-[var(--line)] px-[19px] py-[11px] text-[.92rem] transition-colors duration-200 hover:border-[var(--v)] hover:bg-[rgba(146,119,255,.14)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
