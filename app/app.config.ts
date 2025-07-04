export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
    },
    navigationMenu: {
      compoundVariants: [
        {
          variant: 'pill',
          active: true,
          highlight: false,
          class: {
            link: 'before:bg-neutral-700'
          }
        },
        {
          disabled: false,
          active: false,
          variant: 'pill',
          class: {
            link: [
              'hover:text-gray-50 hover:before:bg-neutral-700',
              'transition-colors before:transition-colors'
            ],
            linkLeadingIcon: [
              'group-hover:text-gray-50',
              'transition-colors'
            ]
          }
        }]
    }
  },
  uiPro: {
    dashboardToolbar: {
      slots: {
        root: 'bg-default'
      }
    },
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
        body: 'mx-auto w-full max-w-[120rem]'
      }
    }
  }

})
