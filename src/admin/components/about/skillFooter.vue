<template lang="pug">
  .skill-card__footer
    .skill__input--new-title-wrapper(
      :class="{'error' : validation.firstError('skill.title')}"
    )
      input(type="text" placeholder="Новый навык" v-model="skill.title").skill__input.skill__input--title.skill__input--new-title
      .skill__input-error
        error-tooltip(
          :errorText="validation.firstError('skill.title')"
        )
    .skill__percent-block.skill__percent-block--new-skill(
      :class="{'error' : validation.firstError('skill.percent')}"
    )
      input(type="text" placeholder="100" v-model="skill.percent").skill__input.skill__input--percent.skill__input--new-percent
      span.skill__percent-prefix.skill__percent-prefix--new-skill %
      .skill__input-error
        error-tooltip(
          :errorText="validation.firstError('skill.percent')"
        )
    button(
      type="button"
      @click="addNewSkill"
    ).btn.btn--add-skill +
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "skill.title": value => {
      return Validator.value(value).required("Введите название навыка");
    },
    "skill.percent": value => {
      return Validator.value(value)
        .required("Введите значение")
        .digit("Тут должно быть число")
        .between(0, 100, "Значение должно быть между 0 и 100");
    }
  },
  components: {
    errorTooltip: () => import("components/common/errorTooltip.vue")
  },
  props: {
    category: Number
  },
  data() {
    return {
      skill: {
        title: "",
        percent: "",
        category: this.category
      }
    };
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async addNewSkill() {
      if ((await this.$validate()) === false) return;
      try {
        await this.addSkill(this.skill);
        this["SHOW_TOOLTIP"]({
          type: "success",
          text: "Навык добавлен"
        });
        this.skill.title = "";
        this.skill.percent = "";

        this.validation.reset();
      } catch (error) {
        console.log(error.message);
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: "Произошла ошибка"
        });
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";
@import "./styles/skill-card.pcss";
@import "./styles/skill.pcss";
</style>
