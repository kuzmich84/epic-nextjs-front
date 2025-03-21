import { FeatureSection } from '@/components/custom/feature-section'
import { HeroSection } from '@/components/custom/hero-section'
import { getHomePageData } from '@/data/loaders'
import { flattenAttributes, getStrapiURL } from '@/lib/utils'
import qs from 'qs'

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ['url', 'alternativeText'],
        },
        link: {
          populate: true,
        },
        feature: {
          populate: true,
        },
      },
    },
  },
})

function blockRenderer(block: any) {
  switch (block.__component) {
    case 'layout.hero-section':
      return <HeroSection key={block.id} data={block} />
    case 'layout.feautures-section':
      return <FeatureSection key={block.id} data={block} />
    default:
      return null
  }
}

async function getStrapiData(path: string) {
  const baseUrl = getStrapiURL()
  const url = new URL(path, baseUrl)
  url.search = homePageQuery

  try {
    const response = await fetch(url.href, { cache: 'no-store' })
    const data = await response.json()
    const flattenedData = flattenAttributes(data)
    return flattenedData
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const strapiData = await getHomePageData()

  const { blocks } = strapiData
  if (!blocks) return <p>No sections found</p>

  return <main>{blocks.map(blockRenderer)}</main>
}
