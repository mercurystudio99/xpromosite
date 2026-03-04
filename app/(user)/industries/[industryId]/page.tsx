import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import PageWrapper from "@/components/PageWrapper";

export default async function IndustryProductsPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const category = (await params).brandId;
  return (
    <PageWrapper>
      <BreadCrumbCustom
        currentPage={category.split("_").join(" ")}
        previousPages={[
          { name: "Home", url: "/" },
          { name: "Brands", url: "/brands" },
        ]}
      />
      <p className="text-center top-[10%]">
        product of {category.split("_").join(" ")} not found!
      </p>
    </PageWrapper>
  );
}
