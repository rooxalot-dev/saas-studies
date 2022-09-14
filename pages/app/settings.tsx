import { NextPage } from 'next';

import Container from '@components/Container';
import Subtitle from '@components/Subtitle';
import Title from '@components/Title';

const Settings: NextPage = () => {
  return (
    <Container>
      <Title title='Configurações' />
      <Subtitle subtitle='Configurações' />
    </Container>
  );
}

export default Settings;
