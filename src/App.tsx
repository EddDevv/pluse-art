import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomeMain from "./pages/home/homeMain/HomeMain";
import LayoutHome from "./components/layoutHome/LayoutHome";
import About from "./pages/home/about/About";
import { ROUTES } from "./assets/consts/consts";
import Products from "./pages/home/products/Products";
import Team from "./pages/home/team/Team";
import Platform from "./pages/home/platform/Platform";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signUp/SignUp";
import LayoutUser from "./components/layoutUser/LayoutUser";
import { PrivateRoute } from "./privateRoute/PrivateRoute";
import Cabinet from "./pages/user/cabinet/Cabinet";
import Operations from "./pages/user/operations/Operations";
import Withdrawal from "./pages/user/withdrawal/Withdrawal";
import Market from "./pages/user/market/Market";
import MyStocks from "./pages/user/myStocks/MyStocks";
import BrokerDocuments from "./pages/user/brokerDocuments/BrokerDocuments";
import Portfolio from "./pages/user/portfolio/Portfolio";
import Refill from "./pages/user/refill/Refill";
import RefProgram from "./pages/user/refProgram/RefProgram";
import Statistic from "./pages/user/statistic/Statistic";
import Career from "./pages/user/career/Career";
import Settings from "./pages/user/settings/Settings";
import ReferalStructure from "./pages/user/referalStructure/ReferalStructure";
import Messages from "./pages/user/chats/Messages";
import Chats from "./pages/user/chats/Chats";
import Promo from "./pages/user/promo/Promo";
import Shop from "./pages/user/shop/Shop";

export const App = () => (
  <ChakraProvider theme={theme}>
    {/* <HeaderHome/>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
      </Grid>
    </Box> */}
    <Routes>
      <Route path="/" element={<LayoutHome />}>
        <Route index element={<HomeMain />} />
      </Route>
      <Route path={ROUTES.about} element={<LayoutHome />}>
        <Route index element={<About />} />
      </Route>
      <Route path={ROUTES.contacts} element={<LayoutHome />}>
        <Route index element={<Team />} />
      </Route>
      <Route path={ROUTES.faq} element={<LayoutHome />}>
        <Route index element={<Platform />} />
      </Route>
      <Route path={ROUTES.products} element={<LayoutHome />}>
        <Route index element={<Products />} />
      </Route>
      <Route path="/login" element={<LayoutHome />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/signup" element={<LayoutHome />}>
        <Route index element={<SignUp />} />
      </Route>
      <Route path="/signup/:id" element={<LayoutHome />}>
        <Route index element={<SignUp />} />
      </Route>

      <Route path={ROUTES.reviews} element={<LayoutHome />}>
        <Route index element={<HomeMain />} />
      </Route>

      {/* **************КАБИНЕТ************************* */}
      <Route path="/user" element={<LayoutUser />}>
        <Route path="/user" element={<PrivateRoute />}>
          <Route index element={<Operations />} />
        </Route>
        {/* <Route path={ROUTES.broker} element={<PrivateRoute />}>
          <Route index element={<Cabinet />} />
        </Route> */}

        <Route path={ROUTES.market} element={<PrivateRoute />}>
          <Route index element={<Market />} />
        </Route>
        <Route path={ROUTES.stocks} element={<PrivateRoute />}>
          <Route index element={<MyStocks />} />
        </Route>
        <Route path={ROUTES.tarif} element={<PrivateRoute />}>
          <Route index element={<Cabinet />} />
        </Route>
        <Route path={ROUTES.documents} element={<PrivateRoute />}>
          <Route index element={<BrokerDocuments />} />
        </Route>

        <Route path={ROUTES.conservative} element={<PrivateRoute />}>
          <Route index element={<Portfolio portfolioId={0} />} />
        </Route>
        <Route path={ROUTES.moderate} element={<PrivateRoute />}>
          <Route index element={<Portfolio portfolioId={1} />} />
        </Route>
        <Route path={ROUTES.agressive} element={<PrivateRoute />}>
          <Route index element={<Portfolio portfolioId={2} />} />
        </Route>

        {/* для возврата с Freekasa */}
        <Route path={`${ROUTES.refill}/success`} element={<PrivateRoute />}>
          <Route index element={<Refill success={true} />} />
        </Route>
        <Route path={`${ROUTES.refill}/error`} element={<PrivateRoute />}>
          <Route index element={<Refill success={false} />} />
        </Route>
        <Route path={ROUTES.refill} element={<PrivateRoute />}>
          <Route index element={<Refill />} />
        </Route>
        <Route path={ROUTES.withdrawal} element={<PrivateRoute />}>
          <Route index element={<Withdrawal />} />
        </Route>
        <Route path={ROUTES.operations} element={<PrivateRoute />}>
          <Route index element={<Operations />} />
        </Route>

        <Route path={ROUTES.refProgram} element={<PrivateRoute />}>
          <Route index element={<RefProgram />} />
        </Route>
        <Route path={ROUTES.statistics} element={<PrivateRoute />}>
          <Route index element={<Statistic />} />
        </Route>
        <Route path={ROUTES.structure} element={<PrivateRoute />}>
          <Route index element={<ReferalStructure />} />
        </Route>
        <Route path={`${ROUTES.chat}:id/:name`} element={<PrivateRoute />}>
          <Route index element={<Messages />} />
        </Route>
        <Route path={ROUTES.chats} element={<PrivateRoute />}>
          <Route index element={<Chats />} />
        </Route>
        <Route path={ROUTES.career} element={<PrivateRoute />}>
          <Route index element={<Career />} />
        </Route>

        <Route path={ROUTES.cabinet} element={<PrivateRoute />}>
          <Route index element={<Cabinet />} />
        </Route>
        <Route path={ROUTES.settings} element={<PrivateRoute />}>
          <Route index element={<Settings />} />
        </Route>
        <Route path={ROUTES.charity} element={<PrivateRoute />}>
          <Route index element={<Cabinet />} />
        </Route>
        <Route path={ROUTES.pulse} element={<PrivateRoute />}>
          <Route index element={<Cabinet />} />
        </Route>

        <Route path={ROUTES.promo} element={<PrivateRoute />}>
          <Route index element={<Promo />} />
        </Route>

        <Route path={ROUTES.shop} element={<PrivateRoute />}>
          <Route index element={<Shop />} />
        </Route>
        <Route path={`${ROUTES.product}:id`} element={<PrivateRoute />}>
          <Route index element={<Shop />} />
        </Route>
        <Route path={ROUTES.busket} element={<PrivateRoute />}>
          <Route index element={<Shop />} />
        </Route>
      </Route>
    </Routes>
  </ChakraProvider>
);
