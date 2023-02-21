<template>
	<!-- Header // -->
	<Header></Header>
    <hr id="header-end">
	<!-- // Header -->

	<!-- Contents // -->
	<main id="container">
		<div id="contents">
			<router-view />
		</div>
	</main>

	<hr id="container-end">
	<!-- // Contents -->

	<!-- Footer // -->
	<Footer></Footer>
	<!-- // Footer -->
</template> 

<script>
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

export default {
	components: {
		Header,
		Footer
	}
}
</script>