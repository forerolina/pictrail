import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PhotoCard } from '../components/photos/PhotoCard'

const meta: Meta<typeof PhotoCard> = {
  title: 'Components/PhotoCard',
  component: PhotoCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-64 bg-background p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PhotoCard>

export const Default: Story = {
  args: {
    id: 'photo-1',
    urlWatermarked: 'https://picsum.photos/400/300',
    priceBrl: 29.9,
    takenAt: new Date('2024-07-14'),
    routeName: 'Serra do Rio do Rastro',
    purchased: false,
  },
}

export const Purchased: Story = {
  args: {
    ...Default.args,
    purchased: true,
  },
}
