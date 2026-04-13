import { notFound } from "next/navigation";
import { BrainstormingApp } from "@/components/brainstorming-app";
import { isSurveyVariantKey, surveyConfigs } from "@/lib/survey-config";

type SurveyVariantPageProps = {
  params: Promise<{ variant: string }>;
};

export default async function SurveyVariantPage({
  params,
}: SurveyVariantPageProps) {
  const { variant } = await params;

  if (!isSurveyVariantKey(variant)) {
    notFound();
  }

  return <BrainstormingApp config={surveyConfigs[variant]} />;
}
