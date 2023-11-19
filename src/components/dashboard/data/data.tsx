import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const statuses = [
  {
    value: 'published',
    label: 'Published',
    icon: CheckCircledIcon,
  },
  {
    value: 'accepted',
    label: 'Accepted',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'pending',
    label: 'Pending',
    icon: StopwatchIcon,
  },

  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
]

// TODO: Add more categories
export const categories = [
  {
    value: 'from-the-community',
    label: 'From the community',
    icon: '🌍',
  },
]
