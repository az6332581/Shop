import Mock from 'mockjs'

import floor from '@/mock/floor.json'
import banner from '@/mock/banner.json'

Mock.mock("/mock/floor", { code: 200, data: floor })
Mock.mock("/mock/banner", { code: 200, data: banner })
