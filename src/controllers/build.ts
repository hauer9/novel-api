class Build {
  constructor() {
    
  }

  async autoBuild (ctx: any) {
    console.log('print', ctx)
  }
}

export const buildCtrl = new Build()