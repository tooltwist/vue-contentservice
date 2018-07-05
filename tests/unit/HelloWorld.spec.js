import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Banner from '@/components/Banner.vue'

describe('Banner.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'yipee'
    const wrapper = shallowMount(Banner, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
