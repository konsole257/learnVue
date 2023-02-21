<template>
    <slot>
        <div class="nodata">
            <p>Sorry, No Data.</p>
        </div>
    </slot>
</template>

<style lang="scss">
.nodata {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>