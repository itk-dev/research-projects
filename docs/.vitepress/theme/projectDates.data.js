import { execSync } from 'child_process'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const projectsDir = join(import.meta.dirname, '../../projects')

export default {
  load() {
    const dates = {}
    let dirs
    try {
      dirs = readdirSync(projectsDir).filter(name => {
        return statSync(join(projectsDir, name)).isDirectory()
      })
    } catch {
      return dates
    }

    for (const dir of dirs) {
      const projectPath = `/projects/${dir}/`
      try {
        const timestamp = execSync(
          `git log -1 --format=%cI -- "docs/projects/${dir}"`,
          { encoding: 'utf-8', cwd: join(projectsDir, '../..') }
        ).trim()
        if (timestamp) {
          dates[projectPath] = timestamp
        }
      } catch {
        // skip if git fails
      }
    }
    return dates
  }
}
