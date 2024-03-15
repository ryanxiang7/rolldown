// prettier-ignore
/* eslint-disable */
/* auto-generated by NAPI-RS */

const { readFileSync } = require('fs')

let nativeBinding = null
const loadErrors = []

const isMusl = () => {
  let musl = false
  if (process.platform === 'linux') {
    musl = isMuslFromFilesystem()
    if (musl === null) {
      musl = isMuslFromReport()
    }
    if (musl === null) {
      musl = isMuslFromChildProcess()
    }
  }
  return musl
}

const isFileMusl = (f) => f.includes('libc.musl-') || f.includes('ld-musl-')

const isMuslFromFilesystem = () => {
  try {
    return readFileSync('/usr/bin/ldd', 'utf-8').includes('musl')
  } catch {
    return null
  }
}

const isMuslFromReport = () => {
  const report =
    typeof process.report.getReport === 'function'
      ? process.report.getReport()
      : null
  if (!report) {
    return null
  }
  if (report.header && report.header.glibcVersionRuntime) {
    return false
  }
  if (Array.isArray(report.sharedObjects)) {
    if (report.sharedObjects.some(isFileMusl)) {
      return true
    }
  }
  return false
}

const isMuslFromChildProcess = () => {
  try {
    return require('child_process')
      .execSync('ldd --version', { encoding: 'utf8' })
      .includes('musl')
  } catch (e) {
    // If we reach this case, we don't know if the system is musl or not, so is better to just fallback to false
    return false
  }
}

function requireNative() {
  if (process.platform === 'android') {
    if (process.arch === 'arm64') {
      try {
        return require('./rolldown-binding.android-arm64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-android-arm64')
      } catch (e) {
        loadErrors.push(e)
      }
    } else if (process.arch === 'arm') {
      try {
        return require('./rolldown-binding.android-arm-eabi.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-android-arm-eabi')
      } catch (e) {
        loadErrors.push(e)
      }
    } else {
      loadErrors.push(
        new Error(`Unsupported architecture on Android ${process.arch}`),
      )
    }
  } else if (process.platform === 'win32') {
    if (process.arch === 'x64') {
      try {
        return require('./rolldown-binding.win32-x64-msvc.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-win32-x64-msvc')
      } catch (e) {
        loadErrors.push(e)
      }
    } else if (process.arch === 'ia32') {
      try {
        return require('./rolldown-binding.win32-ia32-msvc.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-win32-ia32-msvc')
      } catch (e) {
        loadErrors.push(e)
      }
    } else if (process.arch === 'arm64') {
      try {
        return require('./rolldown-binding.win32-arm64-msvc.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-win32-arm64-msvc')
      } catch (e) {
        loadErrors.push(e)
      }
    } else {
      loadErrors.push(
        new Error(`Unsupported architecture on Windows: ${process.arch}`),
      )
    }
  } else if (process.platform === 'darwin') {
    try {
      return require('./rolldown-binding.darwin-universal.node')
    } catch (e) {
      loadErrors.push(e)
    }
    try {
      return require('@rolldown/binding-darwin-universal')
    } catch (e) {
      loadErrors.push(e)
    }

    if (process.arch === 'x64') {
      try {
        return require('./rolldown-binding.darwin-x64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-darwin-x64')
      } catch (e) {
        loadErrors.push(e)
      }
    } else if (process.arch === 'arm64') {
      try {
        return require('./rolldown-binding.darwin-arm64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-darwin-arm64')
      } catch (e) {
        loadErrors.push(e)
      }
    } else {
      loadErrors.push(
        new Error(`Unsupported architecture on macOS: ${process.arch}`),
      )
    }
  } else if (process.platform === 'freebsd') {
    if (process.arch === 'x64') {
      try {
        return require('./rolldown-binding.freebsd-x64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-freebsd-x64')
      } catch (e) {
        loadErrors.push(e)
      }
    } else if (process.arch === 'arm64') {
      try {
        return require('./rolldown-binding.freebsd-arm64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-freebsd-arm64')
      } catch (e) {
        loadErrors.push(e)
      }
    } else {
      loadErrors.push(
        new Error(`Unsupported architecture on FreeBSD: ${process.arch}`),
      )
    }
  } else if (process.platform === 'linux') {
    if (process.arch === 'x64') {
      if (isMusl()) {
        try {
          return require('./rolldown-binding.linux-x64-musl.node')
        } catch (e) {
          loadErrors.push(e)
        }
        try {
          return require('@rolldown/binding-linux-x64-musl')
        } catch (e) {
          loadErrors.push(e)
        }
      } else {
        try {
          return require('./rolldown-binding.linux-x64-gnu.node')
        } catch (e) {
          loadErrors.push(e)
        }
        try {
          return require('@rolldown/binding-linux-x64-gnu')
        } catch (e) {
          loadErrors.push(e)
        }
      }
    } else if (process.arch === 'arm64') {
      if (isMusl()) {
        try {
          return require('./rolldown-binding.linux-arm64-musl.node')
        } catch (e) {
          loadErrors.push(e)
        }
        try {
          return require('@rolldown/binding-linux-arm64-musl')
        } catch (e) {
          loadErrors.push(e)
        }
      } else {
        try {
          return require('./rolldown-binding.linux-arm64-gnu.node')
        } catch (e) {
          loadErrors.push(e)
        }
        try {
          return require('@rolldown/binding-linux-arm64-gnu')
        } catch (e) {
          loadErrors.push(e)
        }
      }
    } else if (process.arch === 'arm') {
      try {
        return require('./rolldown-binding.linux-arm-gnueabihf.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-linux-arm-gnueabihf')
      } catch (e) {
        loadErrors.push(e)
      }
    } else if (process.arch === 'riscv64') {
      if (isMusl()) {
        try {
          return require('./rolldown-binding.linux-riscv64-musl.node')
        } catch (e) {
          loadErrors.push(e)
        }
        try {
          return require('@rolldown/binding-linux-riscv64-musl')
        } catch (e) {
          loadErrors.push(e)
        }
      } else {
        try {
          return require('./rolldown-binding.linux-riscv64-gnu.node')
        } catch (e) {
          loadErrors.push(e)
        }
        try {
          return require('@rolldown/binding-linux-riscv64-gnu')
        } catch (e) {
          loadErrors.push(e)
        }
      }
    } else if (process.arch === 's390x') {
      try {
        return require('./rolldown-binding.linux-s390x-gnu.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('@rolldown/binding-linux-s390x-gnu')
      } catch (e) {
        loadErrors.push(e)
      }
    } else {
      loadErrors.push(
        new Error(`Unsupported architecture on Linux: ${process.arch}`),
      )
    }
  } else {
    loadErrors.push(
      new Error(
        `Unsupported OS: ${process.platform}, architecture: ${process.arch}`,
      ),
    )
  }
}

nativeBinding = requireNative()

if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
  try {
    nativeBinding = require('./rolldown-binding.wasi.cjs')
  } catch (err) {
    if (process.env.NAPI_RS_FORCE_WASI) {
      console.error(err)
    }
  }
  if (!nativeBinding) {
    try {
      nativeBinding = require('@rolldown/binding-wasm32-wasi')
    } catch (err) {
      if (process.env.NAPI_RS_FORCE_WASI) {
        console.error(err)
      }
    }
  }
}

if (!nativeBinding) {
  if (loadErrors.length > 0) {
    // TODO Link to documentation with potential fixes
    //  - The package owner could build/publish bindings for this arch
    //  - The user may need to bundle the correct files
    //  - The user may need to re-install node_modules to get new packages
    throw new Error('Failed to load native binding', { cause: loadErrors })
  }
  throw new Error(`Failed to load native binding`)
}

module.exports.Bundler = nativeBinding.Bundler