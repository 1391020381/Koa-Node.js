// const { assert ,expect } = require('chai')
// const foo = 'bar'
// const beverages = { tea:['chai','matcha','colong']}
// assert.typeOf(foo,'string')
// assert.typeOf(foo,'string','foo is string')
// assert.equal(foo,'bar','foo equal "bar"')


// const foo = 'bar'
// const beverages = { tea:['chai','macha','oolong']}

// expect(foo).to.be.a('string')

const request = require('supertest')
const Koa = require('koa')
const should = require('chai').should()
const { assert ,expect} = require('chai')
const foo = 'bar'

describe('String',()=>{
  it('foo should be a string',()=>{
    foo.should.be.a('string')
  })
})

const beverages = { tea:['chai','mocha','oolong'] }

describe('Array',()=>{
  describe('#indexOf()',()=>{
    it('should return -1 when the value is not present',()=>{
      beverages.tea.indexOf('puer').should.equal(-1)
    })
  })
})

describe('Asynchronous',()=>{
  // if('done should be executed after 200ms',(done)=>{
  //   const fn = ()=>{
  //     foo.should.be.a('string')
  //     done()
  //   }
  //   setTimeout(fn,200)
  // })
  it('done should be executed after 200ms',(done)=>{
    const fn = ()=>{
      // beverages.tea.indexOf('puer').should.equal(-1)
      foo.should.be.a('string')
      done()
    }
    setTimeout(fn,200)
  })
})

describe('Promise',()=>{
  it('promise should be executd after 200ms',()=>{
    return new Promise(resolve=>{
      foo.should.be.a('string')
      resolve()
    })
  })
})

describe('hooks',()=>{
  before(()=>{

  })
  after(()=>{

  })
  beforeEach(()=>{

  })
  afterEach(()=>{
    
  })
})

describe('test.index.js',()=>{
  it('should always set "Access-Control-Allow-Origin to *"',done=>{
    const app = new Koa()
  //  console.log('expect:',expect)
    app.use(async(ctx,next)=>{
      ctx.set('Access-Control-Allow-Origin','*')
      next()
    })
    app.use(function(ctx){
      ctx.body = {foo:'bar'}
    })
   request(app.listen())
   .get('/')
   .expect('Access-Control-Allow-Origin','*')
   .expect({foo:'bar'}).expect(200,done)
  })
})