// Styled components overcome the problem of css i.e styles leaking as in like if one developer starts working on another's program
// and creates a styled classname that already exists, only one of the styles would be applied to the class.
// With styled components, 
// we can stick to css writing convention i.e kebab case 
// pass on props to the component for dynamic styling
// enhances readability and reusability


import styled from 'styled-components'

export const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 80px;  
`;