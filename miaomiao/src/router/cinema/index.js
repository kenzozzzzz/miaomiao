export default {
    path : '/cinema',
    component : ()=> import('@/views/Cinema'),
    children: [
        {
            path : 'allcity',
            component : ()=>import('@/components/Allcity')
        },
        {
            path : 'brand',
            component : ()=>import('@/components/Brand')
        },
        {
            path : 'features',
            component : ()=>import('@/components/Features')
        },
        {
            path : '/cinema',
            component : ()=>import('@/components/Allcity')
        }
    ]
}