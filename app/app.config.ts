export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
    }
  },
  uiPro: {
    pageCard: {
      slots: {
        root: 'relative rounded-xl',
        container: 'gap-y-1.5',
        wrapper: 'items-start rounded',
        leading: 'p-2.5 rounded-full bg-blue-600/10 ring ring-inset ring-blue-600 flex-col',
        title: 'font-normal text-muted',
        leadingIcon: 'text-blue-600'
      },
      variants: {
        variant: {

        }
      }
    },
    dashboardPanel: {
      slots: {
        body: 'bg-gray-100'
      }
    }
  }

})
