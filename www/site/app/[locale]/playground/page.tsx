import { getDictionary } from "@/dictionaries/dictionaries";
import PlaygroundClient from "./PlaygroundClient";

export default async function ExamplesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "tr");

  return <PlaygroundClient dict={dict} locale={locale} />;
}
