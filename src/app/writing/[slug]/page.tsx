import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReturnLink } from "@/components/sites/mihirmahakalkar/return-link";
import { SiteFrame } from "@/components/sites/mihirmahakalkar/site-frame";
import { ARTICLES, getArticle } from "@/lib/sites/mihirmahakalkar/writing";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Writing — Mihir Mahakalkar" };
  return {
    title: `${article.title} — Mihir Mahakalkar`,
    description: article.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <SiteFrame>
      <div data-fade="0.06" data-fade-kind="body" className="return-bar">
        <ReturnLink href="/writing" label="writing" />
      </div>
      <article data-fade="0.14" data-fade-kind="body" className="article-column mt-8">
        <header className="flex items-baseline justify-between gap-6">
          <h1 className="min-w-0">{article.title}</h1>
          <time className="article-date shrink-0" dateTime={article.dateTime}>
            {article.dateLong}
          </time>
        </header>
        <div className="article-body">
          {article.blocks.map((block, index) => {
            if (block.type === "h2") {
              return <h2 key={index}>{block.text}</h2>;
            }
            if (block.type === "list") {
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "parts") {
              return (
                <div key={index} className="ste-parts">
                  {block.groups.map((group) => (
                    <section key={group.title} className="ste-part">
                      <h3>{group.title}</h3>
                      <ol>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    </section>
                  ))}
                </div>
              );
            }
            if (block.type === "flow") {
              return (
                <div key={index} className="ste-flow">
                  {block.steps.map((step, stepIndex) => (
                    <div key={step.kicker}>
                      {stepIndex > 0 ? (
                        <span className="ste-flow-arrow" aria-hidden="true">
                          ↓
                        </span>
                      ) : null}
                      <div className="ste-flow-card">
                        <p className="ste-flow-kicker">{step.kicker}</p>
                        <p>{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
            if (block.type === "table") {
              return (
                <div key={index} className="ste-table-wrap">
                  <table className="ste-table">
                    <thead>
                      <tr>
                        {block.headers.map((header) => (
                          <th key={header} scope="col">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row) => (
                        <tr key={row.join("|")}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={
                                cell === "Approved"
                                  ? "ste-yes"
                                  : cell === "Not approved"
                                    ? "ste-no"
                                    : undefined
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (block.type === "limits") {
              return (
                <ul key={index} className="ste-limits">
                  {block.items.map((item) => (
                    <li key={item.label}>
                      <span className="ste-limit-label">{item.label}</span>
                      <span className="ste-limit-track" aria-hidden="true">
                        <span style={{ width: `${item.width}%` }} />
                      </span>
                      <span className="ste-limit-value">{item.value}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "history") {
              return (
                <ol key={index} className="ste-history">
                  {block.items.map((item) => (
                    <li key={item.year}>
                      <span className="ste-history-year">{item.year}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ol>
              );
            }
            return <p key={index}>{block.text}</p>;
          })}
        </div>
      </article>
    </SiteFrame>
  );
}
