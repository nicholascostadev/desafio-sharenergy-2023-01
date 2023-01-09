import { validateCPF } from '../../validations/cpfValidator'
describe('cpfValidator', () => {
  it('Should return false if cpf is invalid', () => {
    expect(validateCPF('00000000000')).toBe(false)
    expect(validateCPF('41244124123')).toBe(false)
  })

  it('Should return false if cpf does not have the length needed', () => {
    expect(validateCPF('123123123')).toStrictEqual(false)
    expect(validateCPF('112.512.179-99')).toBe(false)
  })

  it('Should return true if cpf is valid', () => {
    expect(validateCPF('11846181003')).toStrictEqual(true)
    expect(validateCPF('74313298061')).toStrictEqual(true)
    expect(validateCPF('54149964076')).toStrictEqual(true)
    expect(validateCPF('76195753084')).toStrictEqual(true)
    expect(validateCPF('96623607005')).toStrictEqual(true)
    expect(validateCPF('05570501037')).toStrictEqual(true)
    expect(validateCPF('64880018090')).toStrictEqual(true)
  })
})
