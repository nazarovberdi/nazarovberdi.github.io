import { useHead } from "@unhead/vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

interface PageMeta {
  title?: string;
  description?: string;
  ogType?: string;
  image?: string;
}

const SITE_NAME = "Nazarov Berdi";
const SITE_URL = "https://nazarovberdi.github.io";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpeg`;

export function usePageMeta(getMeta: () => PageMeta): void {
  const meta = computed(getMeta);
  const route = useRoute();

  const ogUrl = computed(() => `${SITE_URL}${route.path}`);
  const ogImage = computed(() => meta.value.image ?? DEFAULT_OG_IMAGE);

  useHead({
    title: computed(() => {
      const title = meta.value.title;
      return title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    }),
    meta: [
      {
        name: "description",
        content: computed(() => meta.value.description ?? ""),
      },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: ogUrl },
      {
        property: "og:title",
        content: computed(() => meta.value.title ?? SITE_NAME),
      },
      {
        property: "og:description",
        content: computed(() => meta.value.description ?? ""),
      },
      {
        property: "og:type",
        content: computed(() => meta.value.ogType ?? "website"),
      },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: computed(() => meta.value.title ?? SITE_NAME),
      },
      {
        name: "twitter:description",
        content: computed(() => meta.value.description ?? ""),
      },
      { name: "twitter:image", content: ogImage },
    ],
  });
}
