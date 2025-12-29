import React from 'react';

export type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section style={{ padding: '2rem 0' }}>
      {title ? <h2 style={{ marginBottom: '1rem' }}>{title}</h2> : null}
      <div>{children}</div>
    </section>
  );
}
