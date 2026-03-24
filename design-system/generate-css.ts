import * as fs from 'fs'
import * as path from 'path'
import { generateRootCSS } from './utils'

const isCheck = process.argv.includes('--check')
const globalsPath = path.join(__dirname, '..', 'app', 'globals.css')
const generated = generateRootCSS()

if (isCheck) {
  const current = fs.readFileSync(globalsPath, 'utf-8')
  if (!current.includes(generated.split('\n')[1].trim())) {
    console.error('❌ Design tokens are out of sync. Run `npm run tokens`.')
    process.exit(1)
  }
  console.log('✅ Design tokens are in sync.')
} else {
  console.log('Generated CSS:')
  console.log(generated)
  console.log('\n✅ Run this output into your globals.css :root block.')
}
