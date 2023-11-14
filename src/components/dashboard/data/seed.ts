import fs from 'fs'
import path from 'path'
import { faker } from '@faker-js/faker'

import { statuses } from './data'

const hooks = Array.from({ length: 100 }, () => ({
  id: `HOOK-${faker.number.int({ min: 1000, max: 9999 })}`,
  title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  status: faker.helpers.arrayElement(statuses).value,
  description: faker.lorem.paragraph(),
  creator: faker.hacker.phrase(),
  website: faker.internet.url(),
  github: faker.internet.url(),
}))

fs.writeFileSync(
  path.join(__dirname, 'hooks.json'),
  JSON.stringify(hooks, null, 2)
)

console.log('✅ Hooks data generated.')
